<template>
    <div :id="id" />
</template>
<script>
import { nanoid } from 'nanoid'

export default {
    props: {
        projectId: {
            type: String,
            required: true
        },
        embedOptions: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            id: nanoid()
        }
    },
    mounted() {
        StackBlitzSDK.embedProjectId(this.id, this.projectId, this.embedOptions);
    }
}
</script>