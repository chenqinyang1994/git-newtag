const path = require("path");
const fs = require("fs");
const { exit } = require("process");
const { simpleGit } = require("simple-git");
const dayjs = require("dayjs");

interface NtProps {
  tagHead: string;
  versionName: string;
  tagMessage?: string;
}

const ntConfigPath = path.join(process.cwd(), "nt.config.js");
const ntConfigContent = fs.readFileSync(ntConfigPath, "utf8");

let ntConfig: NtProps = {
  tagHead: "release-online",
  versionName: "v",
};

try {
  const evalObject = eval(ntConfigContent);
  if (typeof evalObject !== "object") {
    throw new Error("🚨 nt.config.js 解析出错");
  }
  ntConfig = evalObject;
} catch (error) {
  console.error(error);
  exit(0);
}

const { tagHead = "release-online", versionName = "v", tagMessage } = ntConfig;

const message = tagMessage || process.argv[2];

function getNewTag(tagList) {
  function getLastDate(tag) {
    let lastDate = tag.match(/\d{1,4}-\d{1,2}-\d{1,2}/g)[0];
    lastDate = lastDate.split("-")[0].length < 4 ? `20${lastDate}` : lastDate;
    return lastDate;
  }
  let version = 1;
  const today = dayjs().format("YYYY-MM-DD");
  let lastTag = tagList.sort((a, b) => {
    const target = +dayjs(getLastDate(b)) - +dayjs(getLastDate(a));
    if (target === 0) {
      return (
        +b.toLowerCase().split(`-${versionName}`)[1] -
        +a.toLowerCase().split(`-${versionName}`)[1]
      );
    }
    return target;
  })[0];
  if (lastTag) {
    if (dayjs(getLastDate(lastTag)).format("YYYY-MM-DD") === today) {
      version = +lastTag.toLowerCase().split(`-${versionName}`)[1] + 1;
    }
  }
  return `${tagHead}-${today}-${versionName}${version}`;
}

const options = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

// when setting all options in a single object
const git = simpleGit(options);

git.pull().tags((err, tags) => {
  const tagList: any[] = [];
  (tags.all || []).forEach((item) => {
    if (new RegExp(`^${tagHead}`).test(item)) {
      tagList.push(item);
    }
  });
  const newtag = getNewTag(tagList);
  git.addAnnotatedTag(newtag, message || "", () => {
    console.log(`🚀🚀🚀 new tag name: ${newtag} 🚀🚀🚀`);
    git.pushTags();
    console.log(`✨✨✨ 发布完毕 ✨✨✨`);
  });
});
