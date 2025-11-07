import inquirer from "inquirer";
const pokemons = [{
    name: "Pikachu",
    hp: 250,
    moves: [
      { name: "Éclair", power: 40, accuracy: 90, pp: 5 },
      { name: "Queue de fer", power: 50, accuracy: 85, pp: 5 },
      { name: "Tonnerre", power: 90, accuracy: 70, pp: 3 },
      { name: "Vive-Attaque", power: 30, accuracy: 95, pp: 8 },
      { name: "Fatal-Foudre", power: 110, accuracy: 60, pp: 2 },
    ],
  },{
    name: "Dracaufeu",
    hp: 280,
    moves: [
      { name: "Lance-Flammes", power: 90, accuracy: 85, pp: 5 },
      { name: "Griffe", power: 40, accuracy: 95, pp: 10 },
      { name: "Danse Flammes", power: 70, accuracy: 80, pp: 4 },
      { name: "Déflagration", power: 110, accuracy: 60, pp: 2 },
      { name: "Coud’Krâne", power: 75, accuracy: 85, pp: 5 },
    ],
  },{
    name: "Bulbizarre",
    hp: 260,
    moves: [
      { name: "Fouet Lianes", power: 45, accuracy: 90, pp: 6 },
      { name: "Tranch’Herbe", power: 55, accuracy: 95, pp: 6 },
      { name: "Lance-Soleil", power: 120, accuracy: 60, pp: 2 },
      { name: "Charge", power: 35, accuracy: 100, pp: 10 },
      { name: "Bombe Beurk", power: 90, accuracy: 70, pp: 4 },
    ],},];


function healthBar(currentHp, maxHp, barLength = 10) {
  const filled = Math.max(0, Math.min(barLength, Math.round((currentHp / maxHp) * barLength)));
  const empty = barLength - filled;
  return "🟩".repeat(filled) + "🟥".repeat(empty);
}

function attack(attacker, defender, move) {
  if (move.pp <= 0) {
    console.log(` ${move.name} n’a plus de PP !`);
    return;
  }

  move.pp--;
  console.log(`⚡ ${attacker.name} utilise ${move.name} (${move.pp} PP restants)`);

  const hitChance = Math.random() * 100;
  if (hitChance > move.accuracy) {
    console.log(` L’attaque échoue !`);
    return;
  }

  const damage = Math.floor(move.power + Math.random() * 10 - 5);
  defender.hp -= damage;
  if (defender.hp < 0) defender.hp = 0;

  console.log(` ${defender.name} perd ${damage} HP !`);
  console.log(
    `${defender.name} [${healthBar(defender.hp, 250)}] ${defender.hp} HP restants`
  );
}


async function main() {
  console.log("===   MINI COMBAT POKÉMON  ===\n");

  // Choix du Pokémon par le joueur
  const { playerPokemon } = await inquirer.prompt([
    {
      type: "list",
      name: "playerPokemon",
      message: "Choisis ton Pokémon :",
      choices: pokemons.map((p) => p.name),
    },
  ]);

  const player = JSON.parse(
    JSON.stringify(pokemons.find((p) => p.name === playerPokemon))
  );

  const bot = JSON.parse(
    JSON.stringify(
      pokemons[Math.floor(Math.random() * pokemons.length)]
    )
  );

  console.log(`\n Ton Pokémon : ${player.name}`);
  console.log(` Le bot choisit : ${bot.name}\n`);

  // Boucle du combat
  while (player.hp > 0 && bot.hp > 0) {
    console.log(`\n❤️ ${player.name}: [${healthBar(player.hp, 250)}] ${player.hp} HP`);
    console.log(`💀 ${bot.name}: [${healthBar(bot.hp, 250)}] ${bot.hp} HP\n`);

    const { moveName } = await inquirer.prompt([
      {
        type: "list",
        name: "moveName",
        message: "Choisis ton attaque :",
        choices: player.moves.map(
          (m) => `${m.name} (${m.pp} PP)`
        ),
      },
    ]);

    const move = player.moves.find((m) =>
      moveName.startsWith(m.name)
    );

    if (move.pp <= 0) {
      console.log(`❌ ${move.name} n’a plus de PP ! Choisis une autre attaque.`);
      continue;
    }

    attack(player, bot, move);

    if (bot.hp <= 0) {
      console.log(`🏆 ${bot.name} est KO ! Tu gagnes le combat !`);
      break;
    }

    // Tour du bot
    const botMoves = bot.moves.filter((m) => m.pp > 0);
    const botMove = botMoves[Math.floor(Math.random() * botMoves.length)];
    console.log(`\n ${bot.name} prépare son attaque...`);
    await new Promise((r) => setTimeout(r, 1000));
    attack(bot, player, botMove);

    if (player.hp <= 0) {
      console.log(` ${player.name} est KO ! ${bot.name} gagne le combat...`);
      break;
    }

    console.log("\n--------------------------------\n");
  }

  console.log("\n===  Fin du combat  ===");
}

// Lancer le jeu
main();
