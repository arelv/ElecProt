const { Telegraf, Markup } = require('telegraf')
const { Keyboard } = require("grammy");
require('dotenv').config()
// Импорт нашего модуля с константами
const my_const = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Обработка команды /start
bot.start(async (ctx) => { ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`) })

// Обработка команды /help
bot.help((ctx) => ctx.reply(my_const.commands))
// Обработка команды /course
bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2'), Markup.button.callback('JS', 'btn_3')],
                [Markup.button.callback('Редакторы', 'btn_11'), Markup.button.callback('Обзоры', 'btn_12'), Markup.button.callback('JS', 'btn_13')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})
/**
 * Функция для отправки сообщения ботом
 * @param {String} id_btn Идентификатор кнопки для обработки
 * @param {String} src_img Путь к изображению, или false чтобы отправить только текст
 * @param {String} text Текстовое сообщение для отправки
 * @param {Boolean} preview Блокировать превью у ссылок или нет, true - блокировать, false - нет
 */

function addActionBot(id_btn, src_img, text, preview) {
    bot.action(id_btn, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src_img !== false) {
                await ctx.replyWithPhoto({
                    source: src_img
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: preview
            })
        } catch (e) {
            console.error(e)
        }
    })
}
// Обработчик кнопок с помощью функции
addActionBot('btn_1', './img/1.jpg', my_const.text1, true)
addActionBot('btn_2', './img/2.jpg', my_const.text2, true)
addActionBot('btn_3', false, my_const.text3, false)
addActionBot('btn_11', false, my_const.text11, false)
addActionBot('btn_12', false, my_const.text12, false)
addActionBot('btn_13', false, my_const.text13, false)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))