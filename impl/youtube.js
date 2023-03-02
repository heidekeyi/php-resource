const child_process = require("child_process");
const icon = require('iconv-lite');

const exist_list = [
    // ['時津屋', 'https://www.youtube.com/@tokitsuyajapaneseteacher1293/videos'],
    // ['出口日語', 'https://www.youtube.com/@deguchi/videos'],
    // ['Haru老师', 'https://www.youtube.com/@HarusJapaneseCafe/videos'],
    // ['何必日語', 'https://www.youtube.com/@yesjap568/videos'],
    // ['井上一宏', 'https://www.youtube.com/@inouesensei/videos'],
    // ['Iku老师', 'https://www.youtube.com/@Ikulaoshi/videos'],
    // ['楊家源', 'https://www.youtube.com/@yokagen88/videos'],
    // ['秋山燿平', 'https://www.youtube.com/@YoheiAkiyama/videos'],
    // ['MJ日語', 'https://www.youtube.com/@mjjapanese/videos'],
    // ['小一语言教室', 'https://www.youtube.com/@user-xr2qe5be3b/videos'],
    // ['SakuraJapaneseCafe', 'https://www.youtube.com/@SakuraJapaneseCafe/videos'],
    ['えびてんちゃんの日本語教室', 'https://www.youtube.com/@ebitenchan/videos'],
];

exist_list.forEach(item => {
    const [name, uri, date] = item;
    const pathname = `D:\\tv\\日语\\${name}\\%(title)s [%(id)s].%(ext)s`;
    const res = child_process.spawn(
        'D:\\tv\\日语\\yt-dlp.exe',
        [uri, '-o', pathname, '--dateafter', date || '20230212'],
    );

    res.stdout.on("data", data => {
        data = Buffer.from(data, 'binary');
        data = icon.decode(data, 'cp936');
        console.log(`stdout: ${data}`);
    });

    res.stderr.on("data", data => {
        data = Buffer.from(data, 'binary');
        data = icon.decode(data, 'cp936');
        console.log(`stderr: ${data}`);
    });

    res.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    res.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
});

