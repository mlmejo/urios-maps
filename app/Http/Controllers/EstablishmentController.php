<?php

namespace App\Http\Controllers;

use App\Models\Establishment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Establishments/Index', [
            'establishments' => Establishment::with(
                'image:imageable_id,url',
                'owner:id,name',
            )
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Establishments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:' . Establishment::class,
            'description' => 'required|string',
            'location' => 'required|string',
            'image' => 'required|image',
        ]);

        $establishment = $request->user()->establishments()
            ->create($request->except('image'));

        $path = $request->file('image')->store('images');

        $establishment->image()->create([
            'url' => $path,
        ]);

        return redirect()->route('establishments.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Establishment $establishment)
    {
        if (Gate::denies('update-establishment', $establishment)) {
            abort(403);
        }

        return Inertia::render('Establishments/Edit', [
            'establishment' => Establishment::with('image:imageable_id,url')
                ->find($establishment->id),
        ]);
    }

    public function show(Establishment $establishment)
    {
        return Inertia::render('Establishments/Show', [
            'establishment' => Establishment::with(
                'image:imageable_id,url',
                'owner:id,name',
            )
                ->find($establishment->id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Establishment $establishment)
    {
        if (Gate::denies('update-establishment', $establishment)) {
            abort(403);
        }

        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Establishment::class)->ignore($establishment),
            ],
            'description' => 'required|string',
            'location' => 'required|string',
            'image' => 'nullable|image',
        ]);

        $establishment->update($request->except('image'));

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images');

            $establishment->image()->update([
                'url' => $path,
            ]);
        }

        return redirect()->route('profile.edit');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Establishment $establishment)
    {
        //
    }
}
