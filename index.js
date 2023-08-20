// Modülleri Tanımlama Sistemleri Oluşturma \\

const { GatewayIntentBits, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionsBitField, Client } = require("discord.js")
const express = require("express")
const app = express()
const config = require("./config.json")
const { userInfo } = require("os")

// Botu Tanımlama \\

const client = new Client({
     intents: [Object.values(GatewayIntentBits)] 
    })

// Eventler \\

client.on("ready", () => {
    console.log(`Bot ${client.user.tag} adlı kişiye giriş yaptı.`)
})

// Site Eventler \\

app.get("/", (req, res) => {
    res.send("APİ'yi kullanmak için: /userinfo=0123456789")
})

app.get("/en/userinfo/:id", async (req, res) => {
    const userId = req.params.id;
    const userResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
          Authorization: `Bot ${config.token}`,
        },
    });
    const user = await userResponse.json();

    const avatarId = user.avatar;
    const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;

    const bannerResponse = await fetch(`https://discord.com/api/v10/users/${userId}/banner`, {
        headers: {
          Authorization: `Bot ${config.token}`,
        },
    });
    const bannerData = await bannerResponse.json();
    const bannerUrl = bannerData.banner ? `https://cdn.discordapp.com/banners/${userId}/${bannerData.banner}.png` : null;


    const afiss = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`
    const afis = afiss.includes("null") ? "null" : afiss;

    // Kullanıcının avatar ve banner bilgisini ekleyerek JSON yanıtı oluşturuyoruz
    const userInfoWithExtras = {
        id: user.id,
        username: user.username,
        global_name: user.global_name,
        avatar_decoration: user.avatar_decoration_data,
        discriminator: user.discriminator,
        ppLink: avatarUrl,
        bannerLink: afis,
        // Diğer istediğiniz bilgileri buraya ekleyebilirsiniz
    };

    res.json(userInfoWithExtras);
});

app.get("/tr/userinfo/:id", async (req, res) => {
    const userId = req.params.id;
    const userResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
          Authorization: `Bot ${config.token}`,
        },
    });
    const user = await userResponse.json();

    const avatarId = user.avatar;
    const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;

    const bannerResponse = await fetch(`https://discord.com/api/v10/users/${userId}/banner`, {
        headers: {
          Authorization: `Bot ${config.token}`,
        },
    });
    const bannerData = await bannerResponse.json();
    const bannerUrl = bannerData.banner ? `https://cdn.discordapp.com/banners/${userId}/${bannerData.banner}.png` : null;


    const afiss = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`
    const afis = afiss.includes("null") ? "null" : afiss;

    // Kullanıcının avatar ve banner bilgisini ekleyerek JSON yanıtı oluşturuyoruz
    const userInfoWithExtras = {
        id: user.id,
        kullanıcı_adı: user.username,
        global_adı: user.global_name,
        profil_dekarasyonu: user.avatar_decoration_data,
        etiket: user.discriminator,
        ppLink: avatarUrl,
        afişLink: afis,
        // Diğer istediğiniz bilgileri buraya ekleyebilirsiniz
    };

    res.json(userInfoWithExtras);
});

// Sistemleri Dinleme Çalıştırma \\

const PORT = 3000

client.login(config.token)
app.listen(PORT, () => {
    console.log(`Site ${PORT} portunda başlatıldı.`)
})
