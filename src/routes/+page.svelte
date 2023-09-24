<script lang="ts">
    import ControlBar from "$lib/components/ControlBar.svelte";
    import Table from "$lib/components/Table.svelte";
    import {filters} from "$lib/store";
    import {onMount} from "svelte";

    export let data;

    let filterOptions = {
        sort: {
            property: 'name',
            order: 'asc'
        },
        search: '',
        filters: {
            expiry: undefined,
            location: undefined,
            category: undefined
        }
    }

    $: filterStore = $filters;
    let items: any = [];

    onMount(() => {
        const interval = setInterval(getItems, 3000);
        getItems();

        const unsub = filters.subscribe((v: any) => {
            getItems();
        });

        return () => {
            clearInterval(interval);
            unsub();
        }
    })

    async function getItems() {
        filterOptions.filters = filterStore;

        const r = await fetch('/api/item/filter', {
            method: 'POST',
            body: JSON.stringify(filterOptions)
        })
        const json = await r.json();
        if (json !== items) items = json;
    }
</script>

<div class="mx-5">
    <ControlBar controls={data.controls}/>
    {#await items}
        <p>Loading</p>
    {:then json}
        {#if json.length === 0}
            <p>No items</p>
        {:else}
            <Table headers={data.headers} items={json}/>
        {/if}
    {/await}
</div>
