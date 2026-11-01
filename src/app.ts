// Packages
import 'dotenv/config'
import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import pc from 'picocolors';

// Files
import usersRouter from './routers/usersRouter.ts';
import groupsRouter from './routers/groupsRouter.ts';
import groupMembersRouter from './routers/groupMembersRouter.ts';
import messagesRouter from './routers/messagesRouter.ts';
import { config } from './configs/dotenvConfig.ts';

const app: Express = express();

if (config.nodeEnv === 'development') {
  console.log('Express running in development mode. Detailed logs active')
}

app.use(express.json());

app.use(cors());

app.use("/api/users", usersRouter);

app.use('/api/groups', groupsRouter);

app.use('/api/group-members', groupMembersRouter);

app.use('/api/messages', messagesRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'Success',
    environment: config.nodeEnv
  })
});

app.listen(config.port, () => {
    console.log(`Express server is listen on port ${config.port}. ${pc.bold('API URL')} = ${pc.bold(pc.white(`http://localhost:${config.port}`))}`),
    console.log(`Open this ${pc.bold('API URL')} on ${pc.bold(pc.magenta('ThunderClient'))}, ${pc.bold(pc.yellow('Postman'))} (If you can't insert image using free ${pc.bold(pc.magenta('ThunderClient'))}), and any ${pc.bold(pc.cyan('Front-End'))} app (Especially ${pc.bold(pc.green('Next.js'))})`),
    console.log(`Use this app with ${pc.bold(pc.red('Caution'))}!`)
});