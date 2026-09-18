function agregarTarea(rl, siguiente) {
    rl.question("Title: ", (title) => {

        // Title cannot be empty
        if (title.trim() === "") {
            console.log("Title cannot be empty.");
            return agregarTarea(rl, siguiente);
        }

        rl.question("Description: ", (description) => {

            // Empty description gets a default value
            if (description.trim() === "") {
                description = "empty";
            }

            rl.question("State: ", (state) => {

                // Empty state gets a default value
                if (state.trim() === "") {
                    state = "pending";
                }

                rl.question("Difficulty: ", (difficulty) => {

                    // Difficulty cannot be empty
                    if (difficulty.trim() === "") {
                        console.log("Difficulty cannot be empty.");
                        return agregarTarea(rl, siguiente);
                    }

                    rl.question("End date: ", (endDate) => {

                        // Empty date gets today's date
                        if (endDate.trim() === "") {
                            endDate = new Date().toISOString().split("T")[0];
                        }

                        const task = {
                            title: title,
                            description: description,
                            state: state,
                            difficulty: difficulty,
                            endDate: endDate
                        };

                        console.log("\nTask created:");
                        console.log(task);

			rl.question("\nPresiona ENTER para volver al menú principal...", () => {
                            siguiente();
                        });

                    });
                });
            });
        });
    });
}

module.exports = agregarTarea;
