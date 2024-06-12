const mixins = {
    data() {
        return {
            uploadPercentage: 0,
        };
    },
    methods: {
        getEnding(count: number) {
            if (count === 1 && count % 100 !== 11) {
                return 'участник';
            } else if ([2, 3, 4].includes(count)) {
                return 'участника';
            } else {
                return 'участников';
            }
        },
        getEndingMembers(count: number) {
            if (count === 1 && count % 100 !== 11) {
                return 'действующий член';
            } else if ([2, 3, 4].includes(count)) {
                return 'действующих члена';
            } else {
                return 'действующих членов';
            }
        },
    },
};

export default mixins;
