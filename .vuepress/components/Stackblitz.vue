<template>
    <div :id="id" />
</template>
<script>

const generateUniqueId = () => {
    const part1 = Math.random().toString(36).substring(2, 15);
    const part2 = Date.now().toString(36);
    return part1 + part2;
}

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
            id: generateUniqueId()
        }
    },
    mounted() {
        StackBlitzSDK.embedProjectId(this.id, this.projectId, this.embedOptions);
    }
}
</script>