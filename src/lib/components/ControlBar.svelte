<script lang="ts">
    import MenuButton from "$lib/components/MenuButton.svelte";
    import Filter from "$lib/components/Filter.svelte";
    import {filters} from "$lib/store";

    type Control = {
        type: string;
        css?: string;
        name?: string;
        route?: string;
        children?: object[];
    }

    export let controls: Control[];

    function dropdownChange(e: any) {
        if (e.detail.data.newValue === 'null') $filters[e.detail.data.name] = null;
        else if (e.detail.data.newValue === 'undefined') $filters[e.detail.data.name] = undefined;
        else $filters[e.detail.data.name] = e.detail.data.newValue;
    }

    function getSelected(name: string) {
        let selection = $filters[name];
        if (selection === undefined) return 'undefined';
        if (selection === null) return 'null'
        return selection;
    }
</script>

<div class="control-bar flex flex-row m-2">
    {#each controls as control}
        {#if control.type === 'text-input'}
            <input type="text" class={"input input-bordered input-primary max-w-xs " + control.css}
                   placeholder="Type to search"/>
        {:else if control.type === 'menu-button'}
            <MenuButton title={control.name ?? ''} children={control.children ?? []}/>
        {:else if control.type === 'dropdown-loader'}
            <Filter name={control.name ?? ''} on:change={dropdownChange} route={control.route ?? ''}
                    selected={getSelected(control.name ?? '')}/>
        {/if}
    {/each}
</div>



