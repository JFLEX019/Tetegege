import fs from "fs";

const menu = process.env.MENUTYPE || 'LINK';
const menuimage = process.env.MENULINK || 'https://telegra.ph/file/757312c921af5f581a38c.jpg';

const getMenu = async (client, m, menureply, botname, mode, video, pict, pushname) => {
  try {
    const categories = ['general', 'ai', 'coding', 'download', 'group', 'owner', 'edit'];
   
let menuText = `\nBOTNAME: ${botname}\n\nMODE: ${mode}:\n\n`;



     menuText += 'Categories and Commands:\n\n';

    for (const category of categories) {
      const commandFiles = fs.readdirSync(`./commands/${category}`).filter((file) => file.endsWith('.js'));

      menuText += `🔖 *${category.charAt(0).toUpperCase() + category.slice(1)}:*\n`;
      for (const file of commandFiles) {
        const commandName = file.replace('.js', '');
        menuText += `${commandName}\n`;
      }

      menuText += '\n'; 
    }

   // await client.sendMessage(m.chat, menuText, { quoted: m });


if (menu === 'VIDEO') {

                   client.sendMessage(m.chat, {
                        video: video,
                        caption: menuText,
                        gifPlayback: true
                    }, {
                        quoted: m
                    })
                } else if (menu === 'IMAGE') {
client.sendMessage(m.chat, { image: { url: menuimage }, caption: menuText, fileLength: "99999"}, { quoted: m })
} else if (menu === 'LINK') {
client.sendMessage(m.chat, {
                        text: menuText,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: botname,
                                body: `Hi ${pushname}`,
                                thumbnail: pict,
                                sourceUrl: `https://github.com/JFLEX019/J-bot-MD`,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    }, {
                        quoted: m
                    })

}
else { menureply(menuText); }
  } catch (error) {
    console.error(error);
    m.reply('An error occurred while fetching the menu.');
  }
};

export default getMenu;
