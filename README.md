# Formatter

Простой форматировщик ваших выводов в консоль или для удобства использование в коде

<p align="center">
    <a href="https://github.com/FOCKUSTY/formatter/blob/main/LICENSE">
        <img alt="FOCKUSTY formatter" src="https://img.shields.io/github/license/fockusty/formatter?style=flat-square">
    </a>
    <a href="https://github.com/FOCKUSTY/formatter">
        <img alt="FOCKUSTY formatter" src="https://img.shields.io/github/languages/top/fockusty/formatter?style=flat-square">
    </a>
    <a href="https://github.com/FOCKUSTY/formatter">
        <img alt="FOCKUSTY formatter" src="https://img.shields.io/github/stars/fockusty/formatter?style=flat-square">
    </a>
</p>

<p align="center">
    <a href="https://github.com/FOCKUSTY/formatter">
        <img alt="FOCKUSTY formatter" src="https://img.shields.io/badge/fockusty-formatter-purple?style=flat-square">
    </a>
    <a href="https://img.shields.io/github/issues/fockusty/formatter">
        <img alt="Formatter version" src="https://img.shields.io/github/issues/fockusty/formatter?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/f-formatter">
        <img alt="Formatter version" src="https://img.shields.io/npm/v/f-formatter.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/f-formatter">
        <img alt="Weekly Downloads" src="https://img.shields.io/npm/dw/f-formatter?style=flat-square">
    </a>
</p>

### Установка

```
npm install f-formatter@latest
```

<hr>

## Примеры

### Formatter

```ts
import Formatter, { Colors } from "f-formatter";

import path from "node:path";
import fs from "node:fs";

const jsonPATH = "./file.json"; /* YOUR-PATH */
const json = fs.readFileSync(path.json(jsonPATH), "utf-8");
const formatter = new Formatter();

/* RuWords требует числового значения, а также стадии (1 объект, 2 объекта, 5 объектов) */
console.log(10, formatter.RuWords(10, ["Штука", "Штуки", "Штук"])); // 10 Штук

/* Comma требует числового или текстового значения */
console.log(formatter.Comma(30.1)); // 30,1

/* FromJSON требует json-file */
console.log(formatter.FromJSON(json)); // Вывыдет объект, массив или null;

/* FromJSONWithPath требует путь к json-file */
console.log(formatter.FromJSONWithPath(jsonPATH)); // Вывыдет объект, массив или null;

/* Color требует текстового значение и цвет */
console.log(formatter.Color("Привет!", Colors.magenta)); // \u001b[35mПривет!\u001B[0m, выведет цветное Привет!

/* Colored требует текстового значение, цвет и разделитель слов */
console.log(formatter.Colored("Я говорю", [Colors.magenta, Colors.reset], " "));
// \u001b[35mЯ\u001B \u001Bговорю\u001B, выведет цветное Я говорю
```

### DateFormatter

```ts
import Formatter from "f-formatter";

const formatter = new Formatter().date;

/* Date требует дату, числовое значение или строку и формат, как вывести время */
console.log(formatter.Date(new Date(), "HH:mm:ss")); // Выведет действительные часы:минуты:секунды

/* Timestamp требует настоящее время (Год, месяц, год) соотвественно [number, number, number] или в виде объекта */
console.log(formatter.Timestamp(formatter.time));
// Выведет временную метку, начинающаяся с 1970 года 1 января в 3 часа, точную вплодь до одного дня (Погрешность функции)

/* toLocaleDMY требует настоящее время (Год, месяц, год) соотвественно [number, number, number] или в виде объект */
console.log(formatter.toLocaleDMY(formatter.time));
// Выведет год, месяц, день, прошедшие с 1970 года 1 января с 3 часов
```

### Time

```ts
import Formatter from "f-formatter";

const time = new Formatter().date.time;

/* Требует настоящий месяц */
console.log(time.getMonthDays(time.time.month)); // Выведет количество дней в данном месяце

/* Требует настоящий месяц */
console.log(time.getMonthDaysFromJanuary(time.time.month)); // Выведет количество дней, прошедшее с начала января
```

<hr>

# Если

- Если возникли проблемы или сложности, создайте [обсуждение](https://github.com/fockusty/formatter/issues/new/choose) в репозитории
- Если Вы заметили проблемы в коде, пишите мне в [Discord](https://discord.gg/5MJrRjzPec) или в [Telegram](https://t.me/FOCKUSTY)
