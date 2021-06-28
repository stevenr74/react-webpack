import sqlite3

conn = sqlite3.connect('games.db')
c = conn.cursor()

def create_table():
    #Modes legend - 1 singleplayer, 2 co-op, 3 multiplayer, 4 mmo
    c.execute('CREATE TABLE gamesToRecommend(pk INTEGER PRIMARY KEY, title TEXT, genre TEXT, age INTEGER, img TEXT, rating INTEGER, devices TEXT, modes INTEGER, kidfriendly INTEGER)')

def data_entry():
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Battlefield 5', 'shooter', 2018, 'bf5.jpg', 73, 'all' , 3, 0)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Fortnite', 'shooter', 2017, 'fortnite.jpg', 81, 'all' , 3, 1)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Pillars of Eternity', 'rpg', 2015, 'poe.jpg', 89, 'all' , 1, 0)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('FIFA 20', 'sports', 2019, 'fifa20.jpg', 79, 'all' , 3, 1)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Overwatch', 'shooter', 2016, 'overwatch.jpg', 91, 'all' , 3, 0)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Minecraft', 'sandbox', 2011, 'minecraft.jpg', 93, 'all' , 3, 0)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Outer Worlds', 'rpg', 2018, 'outerworlds.jpg', 82, 'all' , 1, 0)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Rocket League', 'sports', 201, 'rocketleague.jpg', 85, 'all' , 3, 0)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Stardew Valley', 'simulation', 2016, 'stardew.jpg', 90, 'all' , 3, 0)")
    c.execute("INSERT INTO gamesToRecommend (title, genre, age, img, rating, devices, modes, kidfriendly) VALUES('Rainbow Six Siege', 'shooter', 2015, 'siege.jpg', 94, 'all' , 3, 0)")
    conn.commit()
    c.close()
    conn.close()


create_table()
data_entry()