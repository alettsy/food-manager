<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let options: object[];


    const dispatch = createEventDispatcher();

    function clicked(action: string) {
        dispatch('action', {
            data: action
        });
    }

</script>

<div class="rounded-full dropdown dropdown-top dropdown-end absolute right-4 bottom-4 z-10">
    <label class="btn btn-circle swap swap-rotate bg-primary text-black hover:bg-secondary p-8" tabindex="0">
        <input type="checkbox"/>
        <svg class="swap-off fill-current" height="32" viewBox="0 0 512 512" width="32"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
        </svg>
        <svg class="swap-on fill-current" height="32" viewBox="0 0 512 512" width="32"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
        </svg>
    </label>
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52 text-black" tabindex="0">
        {#each options as child}
            <li><a class="hover:bg-secondary hover:text-black" on:click={clicked(child.action)}>{child.name}</a></li>
        {/each}
    </ul>
</div>
