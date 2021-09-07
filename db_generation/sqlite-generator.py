import sqlite3

conn = sqlite3.connect('games.db')
c = conn.cursor()

def create_table():
    c.execute('CREATE TABLE genres(genre TEXT PRIMARY KEY, description TEXT)')
    c.execute('CREATE TABLE devices(name TEXT PRIMARY KEY, img TEXT)')
    c.execute('CREATE TABLE subgenres(subgenre TEXT PRIMARY KEY, description TEXT, genre TEXT, FOREIGN KEY(genre) REFERENCES genres(genre))')
    c.execute('CREATE TABLE games(title TEXT PRIMARY KEY, releasedate INTEGER, img TEXT, rating INTEGER, subgenre TEXT, mode TEXT, FOREIGN KEY(subgenre) REFERENCES subgenres(subgenre) )')
    c.execute('CREATE TABLE games_devices(game, device, FOREIGN KEY(game) REFERENCES games(title), FOREIGN KEY(device) REFERENCES devices(name))')

def data_entry():
    device_list = [
        ('windows', 'windows.jpg'),
        ('xbox', 'xbox.jpg'),
        ('playstation', 'ps.jpg'),
        ('nintendo', 'nintendo.jpg'),
        ('OSX', 'osx.jpg'),
        ('Linux', 'linux.jpg'),
    ]

    genre_list = [
        ('Action', 'Physical challenges during a level'),
        ('Adventure', 'Interactive story with exploration and puzzle solving'),
        ('Action-Adventure', 'Skill of action games combined with storyline from adventure games'),
        ('RPG', 'Role playing with character development in a defined world'),
        ('Simulation', 'Simulating real life situations'),
        ('Strategy', 'Skillful thinking and planning to achieve victory'),
    ]

    subgenre_list = [
        ('Shooter', 'Defeating enemies using weapons ', 'Action'),
        ('Fighting', 'Close combat between players', 'Action'),
        ('Survival', 'Survive the world and enemies', 'Action'),
        ('Stealth', 'Sneakily accomplish story objectives', 'Action'),
        ('Battle Royale', 'Compete against many other players in open arenas', 'Action'),
        ('MMORPG', 'Massively multiplayer role playing game', 'RPG'),
        ('Action RPG', 'Control over character with rpg mechanics', 'RPG'),
        ('Roguelike', 'Dungeon crawl through procedurally generated levels', 'RPG'),
        ('JRPG', 'Japanese style role playing game', 'RPG'),
        ('Isometric RPG', 'Role playing game with parallel projection', 'RPG'),
        ('Racing', 'Driving cars fast', 'Simulation'),
        ('Life Simulation', 'Controlling one or more artifical lives', 'Simulation'),
        ('Sports', 'Playing sports that simulate those in real life', 'Simulation'),
        ('Competitive', 'Non-real life sports turned competitive', 'Simulation'),
        ('Platformer', 'Exploration and puzzle solving', 'Adventure'),
        ('4X', 'Explore, expand, exploit, exterminate', 'Strategy'),
        ('RTS', 'Real time strategy, make decisions where game time is continuous', 'Strategy'),
        ('TBT', 'Turn based tactics', 'Strategy'),
        ('Sandbox', 'Do anything, build everything', 'Action-Adventure'),
    ]

    game_list = [
        ('World of Warcraft', 2004, 'wow.jpg', 85, 'MMORPG', 'multiplayer'),
        ('Final Fantasy 14', 2013, 'ff14.jpg', 87, 'MMORPG', 'multiplayer'),
        ('Pillars of Eternity', 2015, 'poe.jpg', 89, 'Isometric RPG', 'singleplayer'),
        ('FIFA 20', 2019, 'fifa20.jpg', 79, 'Sports', 'single/multi'),
        ('Minecraft', 2011, 'minecraft.jpg', 93, 'Sandbox', 'single/multi'),
        ('Rocket League', 2015, 'rocketleague.jpg', 95, 'Competitive', 'multiplayer'),
        ('Fortnite', 2017, 'fortnite.jpg', 81, 'Battle Royale', 'multiplayer'),
        ('Overwatch', 2016, 'overwatch.jpg', 91, 'Shooter', 'multiplayer'),
        ('Rainbow Six Siege', 2015, 'siege.jpg', 94, 'Shooter', 'multiplayer'),
        ('Stardew Valley', 2016, 'stardew.jpg', 95, 'Sandbox', 'single/multi'),
        ('The Witcher 3: Wild Hunt', 2015, 'witcher3.jpg', 95, 'Action RPG', 'singleplayer'),
        ('Fallout: New Vegas', 2010, 'fonv.jpg', 97, 'Action RPG', 'singleplayer'),
        ('Fall Guys: Ultimate Knockout', 2020, 'fallguys.jpg', 87, 'Platformer', 'multiplayer'),
        ('Valorant', 2020, 'valorant.jpg', 90, 'Shooter', 'multiplayer'),
        ('League of Legends', 2009, 'lol.jpg', 95, 'Battle Royale', 'singleplayer'),
        ('Starbound', 2016, 'starbound.jpg', 94, 'Sandbox', 'singleplayer'),
        ('Forza Horizon 4', 2018, 'forza4.jpg', 96, 'Racing', 'single/multi'),
        ('Need for Speed Heat', 2019, 'needforspeedheat.jpg', 92, 'Racing', 'single/multi'),
        ('Star Wars Jedi: Fallen Order', 2019, 'fallenorder.jpg', 94, 'Fighting', 'singleplayer'),
        ('Super Meat Boy', 2010, 'supermeatboy.jpg', 91, 'Platformer', 'singleplayer'),
        ('Hollow Knight', 2017, 'hollowknight.jpg', 95, 'Platformer', 'singleplayer'),
        ('Apex Legends', 2019, 'apexlegends.jpg', 94, 'Battle Royale', 'multiplayer'),
        ('Destiny 2', 2017, 'destiny2.jpg', 86, 'Shooter', 'multiplayer'),
        ('Valheim', 2021, 'valheim.jpg', 94, 'Sandbox', 'single/multi'),
        ('Ark: Survival Evolved', 2017, 'ark.jpg', 94, 'Survival', 'single/multi'),
        ('Satisfactory', 2019, 'satisfactory.jpg', 94, 'Sandbox', 'singleplayer'),
        ('Ghost of Tsushima', 2020, 'ghosts.jpg', 96, 'Action RPG', 'singleplayer'),
        ('RimWorld', 2016, 'rimworld.jpg', 96, 'Sandbox', 'singleplayer'),
        ('Factorio', 2013, 'factorio.jpg', 96, 'Sandbox', 'singleplayer'),
        ('Prison Architect', 2015, 'prisonarchitect.jpg', 96, 'Sandbox', 'singleplayer'),
        ('Divinity: Original Sin', 2014, 'divinity1.jpg', 86, 'Isometric RPG', 'single/multi'),
        ('Divinity: Original Sin II', 2014, 'divinity2.jpg', 91, 'Isometric RPG', 'single/multi'),
        ('Pathfinder: Kingmaker', 2017, 'pathfinder.jpg', 91, 'Isometric RPG', 'singleplayer'),
        ('Disco Elysium', 2019, 'discoelysium.jpg', 91, 'Isometric RPG', 'singleplayer'),
        ('Sekiro: Shadows Die Twice', 2019, 'sekiro.jpg', 92, 'Action RPG', 'singleplayer'),
        ('Civilation VI', 2016, 'civ6.jpg', 92, '4X', 'single/multi'),
        ('Call of Duty: Warzone', 2020, 'warzone.jpg', 92, 'Shooter', 'multiplayer'),
        ('PUBG', 2017, 'pubg.jpg', 85, 'Shooter', 'multiplayer'),
        ('Deus Ex: Mankind Divided', 2016, 'mankinddivided.jpg', 85, 'Action RPG', 'singleplayer'),
        ('Starcraft 2', 2010, 'sc2.jpg', 85, 'RTS', 'single/multi'),
        ('Stellaris', 2016, 'stellaris.jpg', 92, '4X', 'singleplayer'),
        ('Total War: Three Kingdoms', 2019, 'totalwar.jpg', 89, 'TBT', 'singleplayer'),
        ('Mount & Blade II: Bannerlord', 2020, 'bannerlord.jpg', 96, 'Strategy', 'multiplayer'),
        ('Assassins Creed: Valhalla', 2020, 'valhalla.jpg', 88, 'Action RPG', 'singleplayer'),
        ('Red Dead Redemption 2', 2029, 'rdr2.jpg', 95, 'Action RPG', 'singleplayer'),
    ]
    
    game_device_list = [
        ('World of Warcraft', 'windows'),
        ('Final Fantasy 14', 'windows'),
        ('Pillars of Eternity', 'windows'),
        ('Pillars of Eternity', 'osx'),
        ('Pillars of Eternity', 'linux'),
        ('FIFA 20', 'windows'),
        ('FIFA 20', 'xbox'),
        ('FIFA 20', 'playstation'),
        ('FIFA 20', 'nintendo'),
        ('Minecraft', 'playstation'),
        ('Minecraft', 'windows'),
        ('Minecraft', 'osx'),
        ('Minecraft', 'linux'),
        ('Minecraft', 'nintendo'),
        ('Minecraft', 'xbox'),
        ('Rocket League', 'playstation'),
        ('Rocket League', 'windows'),
        ('Rocket League', 'osx'),
        ('Rocket League', 'nintendo'),
        ('Rocket League', 'xbox'),
        ('Rocket League', 'linux'),
        ('Fortnite', 'playstation'),
        ('Fortnite', 'windows'),
        ('Fortnite', 'nintendo'),
        ('Fortnite', 'xbox'),
        ('Fortnite', 'osx'),
        ('Overwatch', 'playstation'),
        ('Overwatch', 'windows'),
        ('Overwatch', 'xbox'),
        ('Overwatch', 'nintendo'),
        ('Rainbow Six Siege', 'playstation'),
        ('Rainbow Six Siege', 'windows'),
        ('Rainbow Six Siege', 'xbox'),
        ('Stardew Valley', 'playstation'),
        ('Stardew Valley', 'windows'),
        ('Stardew Valley', 'osx'),
        ('Stardew Valley', 'linux'),
        ('Stardew Valley', 'nintendo'),
        ('Stardew Valley', 'xbox'),
    ]

    c.executemany('INSERT INTO devices VALUES(?, ?);', device_list)
    c.executemany('INSERT INTO genres VALUES(?, ?);', genre_list)
    c.executemany('INSERT INTO subgenres VALUES(?, ?, ?);', subgenre_list)
    c.executemany('INSERT INTO games VALUES(?, ?, ?, ?, ?, ?);', game_list)
    c.executemany('INSERT INTO games_devices VALUES(?, ?);', game_device_list)

    conn.commit()
    c.close()
    conn.close()


create_table()
data_entry()