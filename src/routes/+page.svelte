<script lang='ts'>
    import ControlBar from '$lib/components/ControlBar.svelte';
    import Table from '$lib/components/Table.svelte';
    import { filters } from '$lib/store';
    import { onMount } from 'svelte';
    import ActionButton from '$lib/components/ActionButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import toaster from "$lib/toaster";
    import Confirm from "$lib/components/Confirm.svelte";

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
    };

    $: filterStore = $filters;
    let items: any = new Promise((r: any, _) => setTimeout(r([]), 5000));

    let showConfirm = false;
    let confirmSettings = {
        message: '',
        successMessage: '',
        actionFunction: () => {}
    };

    onMount(() => {
        const interval = setInterval(getItems, 3000);
        getItems();

        const unsub = filters.subscribe((v: any) => {
            getItems();
        });

        return () => {
            clearInterval(interval);
            unsub();
        };
    });

    async function getItems() {
        filterOptions.filters = filterStore;

        const r = await fetch('/api/item/filter', {
            method: 'POST',
            body: JSON.stringify(filterOptions)
        });
        const json = await r.json();
        if (json !== items) items = json;
    }

    let action = 'new';
    let id: number | null = null;
    let type = 'item';
    let showModal = false;

    function newAction(a: any) {
        action = 'new';
        id = null;
        type = a.detail.data;
        showModal = true;
    }

    function editItem(a: any) {
        action = 'edit';
        id = a.detail.data.id;
        type = 'item';
        showModal = true;
    }

    function updateSearch(data: any) {
        filterOptions.search = data.detail.data;
        getItems();
    }

    function updateOrder(data: any) {
        filterOptions.sort.order = data.detail.data.order;
        filterOptions.sort.property = data.detail.data.sortBy;
        getItems();
    }

    function refresh() {
        getItems();
    }

    function remove(payload: any) {
        const item = payload.detail.item;

        confirmSettings = {
            message: 'Delete ' + item.name + '?',
            successMessage: 'Deleted ' + item.name,
            actionFunction: async () => {
                return await fetch('/api/item/delete', {
                    method: 'POST',
                    body: JSON.stringify({id: item.id})
                });
            }
        };

        showConfirm = true;
    }

    // TODO: on phones, display list of item names and search bar, nothing else.

</script>

<div class='main mx-5 text-center'>
    <Confirm bind:showModal={showConfirm} actionFunction={confirmSettings.actionFunction}
             successMessage={confirmSettings.successMessage} message={confirmSettings.message} />
    <Modal {action} bind:showModal {id} {type} on:close={refresh} />
    <ActionButton on:action={newAction} options={data.actions} />
    <ControlBar controls={data.controls} on:searchChanged={updateSearch} />
    {#await items}
        <span class='loading loading-spinner loading-lg text-primary'></span>
    {:then json}
        {#if json.length === 0}
            <p>No items</p>
        {:else}
            <Table sortBy={filterOptions.sort.property} order={filterOptions.sort.order} type='item'
                   headers={data.headers} items={json} on:itemClicked={editItem} on:orderChanged={updateOrder} on:refresh={refresh} on:delete={remove} />
        {/if}
    {/await}
</div>

<style>
    .main {
        visibility: hidden;
        height: calc(100% - 64px);
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        margin-top: 0.25rem;
    }

    @media only screen and (min-width: 480px) and (max-width: 798px) {
        .main {
            visibility: visible;
        }
    }

    @media only screen and (min-width: 798px) {
        .main {
            visibility: visible;
            margin-left: 1.25rem;
            margin-right: 1.25rem;
            margin-top: 1.25rem;
        }
    }
</style>
