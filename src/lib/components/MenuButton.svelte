<script lang="ts">
    import {goto} from "$app/navigation";
    import {createEventDispatcher} from "svelte";

    export let title: string;
    export let children: object[];

    const dispatch = createEventDispatcher();

    function clicked(child: any) {
        let eventType = child.click.type;

        if (eventType === 'event') {
            dispatch('menu-click', {
                data: child
            });
        } else if (eventType === 'nav') {
            goto(child.click.to);
        } else {
            console.log(child);
        }
    }
</script>

<div class="dropdown">
    <label class="btn ml-1 bg-primary text-black hover:bg-secondary" tabindex="0">
        <svg class="swap-off fill-current" height="32" viewBox="0 0 512 512" width="32"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
        </svg>
    </label>
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52 text-black text-lg" tabindex="0">
        {#each children as child}
            <li><a class="hover:bg-secondary hover:text-black" on:click={clicked(child)}>{child.name}</a></li>
        {/each}
    </ul>
</div>
