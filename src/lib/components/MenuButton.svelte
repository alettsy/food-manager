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
    <label class="btn m-1 bg-primary text-black hover:bg-secondary" tabindex="0">{title}</label>
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52 text-black" tabindex="0">
        {#each children as child}
            <li><a class="hover:bg-secondary hover:text-black" on:click={clicked(child)}>{child.name}</a></li>
        {/each}
    </ul>
</div>
