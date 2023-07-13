<script lang="ts">
import { supabase } from "$lib/supabaseClient";

export async function load() {
    let { data: IECC2015, error } = await supabase
  .from('IECC2015')
  .select('*')
}


let state = "Georgia"
let county:string = "Gwinnett"

$: climateZone = "3A"

</script>

<div class="flex flex-row space-x-5 mt-5">
    <input type="text" placeholder="State Name" class="input input-bordered input-primary w-full max-w-xs" bind:value ={state} />
    <input type="text" placeholder="County Name" class="input input-bordered input-primary w-full max-w-xs" bind:value ={county}/>


</div>

<div class="text-lg">Your Climate Zone is {climateZone}</div>

