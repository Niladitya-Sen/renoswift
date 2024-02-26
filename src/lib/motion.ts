export const variants = {
    fadeIn: (delay: number = 0) => {
        return {
            hidden: {
                opacity: 0,
                y: 50,
            },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    delay: delay,
                    duration: 0.5,
                },
            },
        }
    },
    scaleOut: {
        hidden: {
            scale: 1,
        },
        visible: {
            scale: 1.1,
            transition: {
                duration: 5.0,
            },
        },
    }
}