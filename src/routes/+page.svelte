<script lang="ts">
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import { supabase } from "$lib/supabaseClient";

let states:string[] = []
let counties:string[] = []
let selectedState:string = ''
let selectedCounty:string = ''
let climateZone:string = ''
let climateNotification:string = ''
let isVisible = true

function toggleVisibility() {
  isVisible = !isVisible
}

async function fetchStates() {
  const { data } = await supabase.from('IECC2015').select('State');
  states = data.map((row) => row.State);
}

onMount(async () => {
  await fetchStates()
})

async function fetchCountiesByState() {
  selectedCounty = ''
  const { data } = await supabase
    .from('IECC2015')
    .select('County')
    .eq('State',selectedState)
  counties = data.map((row) => row.County)
}

async function fetchClimateZoneByCounty(){
  toggleVisibility()
  climateZone = ''
  const { data } = await supabase
    .from('IECC2015')
    .select('ClimateZone')
    .eq('State',selectedState)
    .eq('County',selectedCounty)
  climateZone = data[0]?.ClimateZone
  toggleVisibility()
}

$: if (selectedCounty.length == 0){
  climateNotification = "Please Select a State and County"
} 
else {
  climateNotification = "The Climate Zone in " + selectedCounty + " County is " + climateZone
}
</script>
<div class="flex flex-col mt-6 items-center max-w-md bg-neutral p-6 border rounded-md">
  <div class="text-xl font-bold">ClimateZones</div>
  <div class="text-base mt-4">A tool to determine an IECC climate zone according to the State and County. Try it out below!</div>
  <div class="flex flex-row flex-auto space mt-5 space-x-3">
    <select class="basis-1/2 select select-bordered" name="states" id="states" bind:value={selectedState} on:change={fetchCountiesByState}>
      <option value=""disabled selected>State</option>
      {#each states as state}
        <option value="{state}">{state}</option>
      {/each}
    </select>
    <select class="basis-1/2 select select-bordered" name="counties" id="counties" bind:value={selectedCounty} on:change={fetchClimateZoneByCounty}>
      <option value=""disabled selected>County</option>
      {#each counties as county}
        <option value="{county}">{county}</option>
      {/each}
    </select>
  </div>  
  {#if isVisible}
  <div class="text-lg mt-5 bg-primary py-2 px-4 rounded-full" transition:fade={{ duration:100 }}>{climateNotification}</div>
  {/if}
</div>