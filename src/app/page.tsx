import database, {Discussion, Game} from './database/models';
import { User } from './database/models';
import {Model} from "sequelize";

export default async function Home() {
  await database.authenticate();
  const disc = await Discussion.findByPk(1)

  if (!disc) {
    return <div>no discussion</div>
  }
  let replies = await disc.getReplies();
  return (
    <main>{JSON.stringify(replies)}</main>
  )
}
