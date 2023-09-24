<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let name: string;
    export let selected: any;
    export let route: string;

    let selectedValue = selected === null ? 'None' : selected;
    selectedValue = selected === undefined ? 'undefined' : selected;

    async function getOptions() {
        const r = await fetch(route);
        return r.json();
    }

    let dispatch = createEventDispatcher();

    function itemChanged() {
        dispatch('change', {
            data: {
                newValue: selectedValue,
                name: name
            }
        })
    }
</script>

{#await getOptions()}
    <p>Loading</p>
{:then json}
    <select bind:value={selectedValue} class="select select-secondary max-w-xs" on:change={itemChanged}>
        <option value={'undefined'}>Any {name}</option>
        <option value={'null'}>None</option>
        {#each json as option}
            <option value={option.id}>{option.name}</option>
        {/each}
    </select>
{/await}
