
import 'dotenv/config';
import {registerCommands} from './registerCommands';


// create a cli async main function that calls main() and handles errors
async function main() {
    await registerCommands();
}

if (require.main === module) {
    main().catch(error => {
        console.error(error);
        process.exit(1);
    });
}


