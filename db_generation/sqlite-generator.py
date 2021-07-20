import sqlite3

conn = sqlite3.connect('games.db')
c = conn.cursor()

def create_table():
    c.execute('CREATE TABLE genres(genre TEXT PRIMARY KEY, description TEXT)')
    c.execute('CREATE TABLE devices(name TEXT PRIMARY KEY, img TEXT)')
    #c.execute('CREATE TABLE modes(name TEXT PRIMARY KEY, description TEXT)')
    c.execute('CREATE TABLE subgenres(subgenre TEXT PRIMARY KEY, description TEXT, genre TEXT, FOREIGN KEY(genre) REFERENCES genres(genre))')
    c.execute('CREATE TABLE games(title TEXT PRIMARY KEY, releasedate INTEGER, img TEXT, rating INTEGER, subgenre TEXT, mode TEXT, FOREIGN KEY(subgenre) REFERENCES subgenres(subgenre) )')
    #c.execute('CREATE TABLE games_modes(game, mode, FOREIGN KEY(game) REFERENCES games(title), FOREIGN KEY(mode) REFERENCES modes(name))')
    c.execute('CREATE TABLE games_devices(game, device, FOREIGN KEY(game) REFERENCES games(title), FOREIGN KEY(device) REFERENCES devices(name))')

def data_entry():
    #Genres
    c.execute("INSERT INTO genres (genre, description) VALUES ('Action', 'Physical challenges during a level')")
    c.execute("INSERT INTO genres (genre, description) VALUES ('Adventure', 'Interactive story with exploration and puzzle solving')")
    c.execute("INSERT INTO genres (genre, description) VALUES ('Action-Adventure', 'Skill of action games combined with storyline from adventure games')")
    c.execute("INSERT INTO genres (genre, description) VALUES ('RPG', 'Role playing with character development in a defined world')")
    c.execute("INSERT INTO genres (genre, description) VALUES ('Simulation', 'Simulating real life situations')")
    c.execute("INSERT INTO genres (genre, description) VALUES ('Strategy', 'Skillful thinking and planning to achieve victory')")
    #Devices
    c.execute("INSERT INTO devices (name, img) VALUES ('windows', 'windows.jpg')")
    c.execute("INSERT INTO devices (name, img) VALUES ('xbox', 'xbox.jpg')")
    c.execute("INSERT INTO devices (name, img) VALUES ('playstation', 'ps.jpg')")
    c.execute("INSERT INTO devices (name, img) VALUES ('nintendo', 'switch.jpg')")
    c.execute("INSERT INTO devices (name, img) VALUES ('OSX', 'osx.jpg')")
    c.execute("INSERT INTO devices (name, img) VALUES ('Linux', 'linux.jpg')")

    #Subgenres
    #Action
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Shooter', 'Defeating enemies using weapons ', 'Action')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Fighting', 'Close combat between players', 'Action')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Survival', 'Survive the world and enemies', 'Action')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Stealth', 'Sneakily accomplish story objectives', 'Action')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Battle Royale', 'Compete against many other players in open arenas', 'Action')")
    #RPG
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('MMORPG', 'Massively multiplayer role playing game', 'RPG')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Action RPG', 'Control over character with rpg mechanics', 'RPG')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Roguelike', 'Dungeon crawl through procedurally generated levels', 'RPG')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('JRPG', 'Japanese style role playing game', 'RPG')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Isometric RPG', 'Role playing game with parallel projection', 'RPG')")
    #Sports
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Racing', 'Driving cars fast', 'Simulation')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Life Simulation', 'Controlling one or more artifical lives', 'Simulation')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Sports', 'Playing sports that simulate those in real life', 'Simulation')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Competitive', 'Non-real life sports turned competitive', 'Simulation')")
    #Adventure
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('Platformer', 'Exploration and puzzle solving', 'Adventure')")
    #Strategy
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('4X', 'Explore, expand, exploit, exterminate', 'Strategy')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('RTS', 'Real time strategy, make decisions where game time is continuous', 'Strategy')")
    c.execute("INSERT INTO subgenres (subgenre, description, genre) VALUES ('TBT', 'Turn based tactics', 'Strategy')")
    
    #Games

    game_list = [
        ('World of Warcraft', 2004, 'wow.jpg', 85, 'MMORPG', 'multiplayer'),
        ('Final Fantasy 14', 2013, 'ff14.jpg', 87, 'MMORPG', 'multiplayer'),
        ('Pillars of Eternity', 2015, 'poe.jpg', 89, 'Isometric RPG', 'singleplayer'),
        ('FIFA 20', 2019, 'fifa20.jpg', 79, 'Sports', 'single/multi'),
        ('Minecraft', 2011, 'minecraft.jpg', 93, 'Life Simulation', 'single/multi'),
        ('Rocket League', 2015, 'rocketleague.jpg', 95, 'Competitive', 'multiplayer'),
        ('Fortnite', 2017, 'fortnite.jpg', 81, 'Battle Royale', 'multiplayer'),
        ('Overwatch', 2016, 'overwatch.jpg', 91, 'Shooter', 'multiplayer'),
        ('Rainbow Six Siege', 2015, 'siege.jpg', 94, 'Shooter', 'multiplayer'),
        ('Stardew Valley', 2016, 'stardew.jpg', 95, 'Life Simulation', 'single/multi')
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
        ('Minecraft', 'switch'),
        ('Minecraft', 'xbox'),
        ('Rocket League', 'playstation'),
        ('Rocket League', 'windows'),
        ('Rocket League', 'osx'),
        ('Rocket League', 'switch'),
        ('Rocket League', 'xbox'),
        ('Rocket League', 'linux'),
        ('Fortnite', 'playstation'),
        ('Fortnite', 'windows'),
        ('Fortnite', 'switch'),
        ('Fortnite', 'xbox'),
        ('Fortnite', 'osx'),
        ('Overwatch', 'playstation'),
        ('Overwatch', 'windows'),
        ('Overwatch', 'xbox'),
        ('Overwatch', 'switch'),
        ('Rainbow Six Siege', 'playstation'),
        ('Rainbow Six Siege', 'windows'),
        ('Rainbow Six Siege', 'xbox'),
        ('Stardew Valley', 'playstation'),
        ('Stardew Valley', 'windows'),
        ('Stardew Valley', 'osx'),
        ('Stardew Valley', 'linux'),
        ('Stardew Valley', 'switch'),
        ('Stardew Valley', 'xbox'),
    ]

    c.executemany('INSERT INTO games VALUES(?, ?, ?, ?, ?, ?);', game_list)
    c.executemany('INSERT INTO games_devices VALUES(?, ?);', game_device_list)

    conn.commit()
    c.close()
    conn.close()


create_table()
data_entry()