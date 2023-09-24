<script lang="ts">
    import MenuButton from "$lib/components/MenuButton.svelte";

    type Control = {
        type: string;
        css?: string;
        name?: string;
        children?: object[];
    }

    export let controls: Control[];
</script>

<div class="control-bar flex flex-row m-2">
    {#each controls as control}
        {#if control.type === 'text-input'}
            <input type="text" class={"input input-bordered input-primary max-w-xs " + control.css}
                   placeholder="Type to search"/>
        {:else if control.type === 'menu-button'}
            <MenuButton title={control.name ?? ''} children={control.children ?? []}/>
        {/if}
    {/each}
</div>



