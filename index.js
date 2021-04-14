const { time } = require('console');
const Discord = require('discord.js');
const { resolve } = require('path');
const { send } = require('process');

const client = new Discord.Client();
const guild = new Discord.GuildMember();


//Değişkenler buraya tanımla

var prefix = '.';



client.once('ready', () => {
    console.log('Hazır!');
    console.log(client.user.tag)
    //Bot Aktivetisini  Ayarlar
    client.user.setActivity('Bot Aktivetisi', { type: 'PLAYING' })
        .then(presence => console.log(`Bot Aktivitesi Olarak ' ${presence.activities[0].name} ' Ayarlandı.`))
        .catch(console.error);

});

client.on('message', message => {
    const hataDegerEmbed = {
        color: '#f11e41',
        title: 'Hatalı Komut Dizimi',
        url: '',
        author: {
            name: message.author.username,
            icon_url: client.user.avatarURL(),
            url: client.user.avatarURL(),
        },
        thumbnail: {
            url: message.author.avatarURL(),
        },
        fields: [
            {
                name: message.author.tag,
                value: 'Hatalı işlem yaptınız',
                inline: false,
            },
            {
                name: '\nBüyük Değer lütfen 50 veya daha az değer girin',
                value: message.content,
                inline: false,
            }
        ],
        footer: {
            text: client.user.tag,
            icon_url: client.user.avatarURL(),
        }
    };
    const yetkiEmbed = {
        color: '#f11e41',
        title: 'Yetki Hatası',
        url: '',
        author: {
            name: message.author.username,
            icon_url: client.user.avatarURL(),
            url: client.user.avatarURL(),
        },
        thumbnail: {
            url: message.author.avatarURL(),
        },
        fields: [
            {
                name: message.author.tag,
                value: 'Mesaj Silme Yetkiniz bulunmamaktadır',
                inline: false,
            },
            {
                name: 'Gereken Yetki Türü  ',
                value: '`KICK_MEMBER`',
                inline: false,
            }
        ],
        footer: {
            text: client.user.tag,
            icon_url: client.user.avatarURL(),
        }
    };

    if (!(message.author.bot)) {
        var msg = message.content.toLowerCase()
        if (msg === prefix + 'komutlar') {
            const komutEmbed = {
                color: '#f11e41',
                title: 'Aktif Komutlar',
                url: '',
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL(),
                    url: client.user.avatarURL(),
                },
                thumbnail: {
                    url: message.author.avatarURL(),
                },
                fields: [
                    {
                        name: prefix + 'clear',
                        value: 'Tek seferde 50 mesaj siler',
                        inline: false,
                    },
                    {
                        name: prefix + 'delete <rakam>',
                        value: '<rakam> yerine yazdığınız sayı kadar mesaj siler',
                        inline: false,
                    },
                    {
                        name: prefix + 'avatar',
                        value: 'Avatarınızı Atar',
                        inline: false,
                    },
                    {
                        name: prefix + 'yt <yazı & tura>',
                        value: 'Yazı tura atar.',
                        inline: true,
                    },
                ],
                footer: {
                    text: client.user.tag,
                    icon_url: client.user.avatarURL(),
                }
            }
            message.channel.send({ embed: komutEmbed })
        } else if (msg === prefix + 'clear') {
            if (message.member.hasPermission('KICK_MEMBERS')) {
                message.channel.bulkDelete(50)
            } else {
                message.channel.send({ embed: yetkiEmbed })
            }
        } else if (msg.startsWith(prefix + 'delete')) {
            if (message.member.hasPermission('KICK_MEMBERS')) {
                var delMessageNum = message.content.replace(prefix + 'delete', ' ');
                if (!(Number(delMessageNum) > 50)) {
                    message.channel.bulkDelete(Number(delMessageNum));
                }
                else {
                    message.channel.send({ embed: hataDegerEmbed });
                }
            }
            else {
                message.channel.send({ embed: yetkiEmbed })
            }
        } else if (msg.startsWith(prefix + 'yt')) {
            var yt = msg.replace(prefix + 'yt ', ' ');
            var ytl = ['yazı', 'tura', 'tura', 'tura', 'tura', 'yazı', 'yazı', 'yazı']
            if (yt === ' ' || !(yt.search('yazı')) || !(yt.search('tura'))) {
                message.reply(`\n\nHata Yanlış komut kullanımı\nKomut => ${msg}`)
            } else {
                var rakam = Math.floor(Math.random() * ytl.length)
                if (yt === ytl[rakam]) {
                    message.channel.send('Kazandın :tada:')
                } else {
                    message.channel.send(`${ytl[rakam]} => Geldi`)
                }
            }
        } else if (msg === prefix + 'avatar') {
            const avatarEmbed = {
                color: '#f11e41',
                title: 'Avatar',
                url: '',
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL(),
                    url: client.user.avatarURL(),
                },
                thumbnail: {
                    url: message.author.avatarURL(),
                },
                fields: [
                    {
                        name: message.author.username,
                        value: 'Avatarınız',
                        inline: false,
                    },
                ],
                image: {
                    url: message.author.avatarURL(),
                },
                timestamp: new Date(),
                footer: {
                    text: client.user.tag,
                    icon_url: client.user.avatarURL(),
                }
            }
            message.channel.send({embed : avatarEmbed})
        }
    }
})

//Bot Tokeni Buraya gelecek
client.login('Token');
