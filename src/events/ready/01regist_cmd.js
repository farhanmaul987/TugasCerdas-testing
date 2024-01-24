const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands')

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        // console.log(localCommands);

        const applicationCommands = await getApplicationCommands(client, testServer);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`🗑️  Command ${name} has been deleted.`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`✏️  Command ${name} has been updated.`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`⏭️  Skipping deleted command ${name}.`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                })

                console.log(`✅  Command ${name} has been registered.`);
            }
        }
    } catch (error) {
        console.log(`There was an error while trying to register commands: ${error}`);
    }
}