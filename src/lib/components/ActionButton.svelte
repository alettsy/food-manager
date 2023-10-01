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
        <svg class="swap-off fill-current h-10 w-10" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M6 12H18M12 6V18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
            </g>
        </svg>
        <svg class="swap-on fill-current h-10 w-10" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M6 12H18M12 6V18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2"></path>
            </g>
        </svg>
    </label>
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52 text-black" tabindex="0">
        {#each options as child}
            <li><a class="hover:bg-secondary hover:text-black" on:click={clicked(child.action)}>{child.name}</a></li>
        {/each}
    </ul>
</div>
