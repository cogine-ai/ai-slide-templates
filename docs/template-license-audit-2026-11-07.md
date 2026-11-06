# 六套已选模板的授权核查

日期：2026-11-07，Asia/Taipei。对应[候选研究](template-research-2026-11-07.md)及[实施记录](template-implementation-2026-11-07.md)。

用户已明确交付为**公开仓库，打包字体和图片，展示用途**，采用“明确限制才停止”的项目标准。此前把未取得积极许可统一作为停止条件的结论已撤回。当前已制作五套、154页；Sports Partnership 的32页候选继续保留，因具体字体限制单独暂缓。该项目标准不等于权利人授予许可，也不把第三方文件改成 MIT。

## 逐套结果

| 来源 | 页数 | 实际字体 | 当前状态 |
|---|---:|---|---|
| [Vacanza — Hana Stojaković](https://pitch.com/templates/Vacanza-2qsHLE3mq5YZ4NgMkd5vxDnj) | 29 | Butler / Inter | 完整制作；Butler 原始文件标识 CC BY-SA 4.0，Inter 为 OFL |
| [Sports Partnership Proposal — Pitch](https://pitch.com/templates/Sports-Partnership-Proposal-2wRCc556v63E4ztwra6yCqXk) | 32 | General Sans / Geist Mono | General Sans 标准许可明确限制本次打包用途；未入库、未替换字体 |
| [Tone of Voice Guidelines — Pitch](https://pitch.com/templates/Tone-of-Voice-Guidelines-5Un4Q33qSKnK4oG6pX0KwzY4) | 30 | DM Serif Display / Inter | 完整制作，字体为 OFL |
| [UX Design Strategy — True to Form](https://pitch.com/templates/UX-Design-Strategy-0cugVn2BponJ4PerqV3LVaBG) | 35 | DM Sans / DM Mono / IBM Plex Mono | 完整制作，字体为 OFL |
| [Launch — Pitch](https://pitch.com/templates/Launch-7UTeTf65ycSw4avV7U6sh6Df) | 35 | DM Sans | 完整制作，字体为 OFL |
| [Indie Publishing — Marko Cvijetic](https://pitch.com/templates/Indie-Publishing-3ToVCx38Vbcq4amp186ZGj5z) | 25 | Manrope | 完整制作，字体为 OFL |

五套均独立编写 HTML/CSS/SVG 和导航，使用新写的虚构示例文案；原字体家族、逐页顺序、位置、构图、裁切、旋转和版式变体保留。没有用整页截图代替模板，没有打包 Pitch 应用运行时代码。代码适用仓库 MIT；源设计和媒体不声称已取得整体再许可。

## 明确限制：General Sans

[General Sans 官方页](https://www.fontshare.com/fonts/general-sans)标注 Closed Source / ITF Free Font License。通过浏览器读取的[官方 ITF FFL](https://www.fontshare.com/licenses/itf-ffl)为2.0，2026-08-17：第02节限制字体文件向第三方分发及第三方模板/编辑用途；第03节要求文档嵌入不能提取字体独立使用；第09节提供另行许可路径。

将可提取的 WOFF/WOFF2 或 Base64 随公开、可编辑 HTML 模板打包，不能按这份标准许可放行。这是本批具体停止项。没有下载或入库 General Sans，没有换字体或转路径冒充原字体版本。若取得覆盖本项目的专项或其他适用许可，可继续完成保留的32页；[询问草稿](template-license-requests-2026-11-07.md)未发送。

## 字体文件核对

实际下载的 Butler 原始 WOFF2 文件，name table 记载作者 Fabian De Smet、版本1.000，许可 URL 为 `http://creativecommons.org/licenses/by-sa/4.0/`。[Font Squirrel 的 Butler 许可页](https://www.fontsquirrel.com/license/butler)也列为 CC BY-SA 4.0。保留未经修改的文件字节、署名、该许可及其全文；不以 MIT 覆盖 Butler。作者官网的免费个人/商业使用说明不再作为唯一依据，未完成 Gumroad 结账或购买。

其余六个实际使用家族从 Google Fonts 官方仓库取得原始 TTF 和 OFL 文本：[Inter](https://github.com/google/fonts/tree/main/ofl/inter)、[DM Serif Display](https://github.com/google/fonts/tree/main/ofl/dmserifdisplay)、[DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans)、[DM Mono](https://github.com/google/fonts/tree/main/ofl/dmmono)、[IBM Plex Mono](https://github.com/google/fonts/tree/main/ofl/ibmplexmono)、[Manrope](https://github.com/google/fonts/tree/main/ofl/manrope)。已核对具体字体名称、版本、字重、可变轴和 SHA-256；字体文件未修改，版权和 OFL 随 HTML 及字体通知保留。Geist Mono 只完成家族许可研究，未随本批五套打包。

“保留字体”指保留实际字族和排版角色；OFL 字体取当前官方上游文件，没有声称其字节与 Pitch CDN 的每个历史版本完全相同。两个旧默认字族 ID 的实际可见排版被 Butler/Inter 或 DM Serif Display/Inter 覆盖，没有统一替换成通用字体栈。

## 源设计与媒体的事实边界

[Pitch 条款](https://pitch.com/terms-of-use)版本1.1.4（2026-10-19）第4.5、13.2、15节和[模板使用说明](https://help.pitch.com/en/articles/4056913-find-and-use-templates)未建立一个覆盖外部独立模板库的整体许可。没有把 Free 标签、公开 API 或导出功能当作授予该许可的证据；也没有据此宣称全部版式明确禁止改编。按用户已明确的标准，缺少积极授权记录单独登记，不统一阻止这五套展示实现。

原始六套目录树共169条媒体资源记录、264处引用，涉及186页。该数包含图片、SVG、视频 URL、海报和缩略图，不是独立照片数或已授权数。实际制作五套时下载151条图片资源，记录源字节和嵌入字节哈希、全部重复来源及页码；位图转换为最长边不超过2560像素的高质量 WebP，保留原裁切与滤镜，SVG 原字节保留。

多数 S3 资源仍缺作者、原始发布页或独立许可对应；8条 Unsplash 摄影 URL 也未全部补齐作者和原始照片页。未给这些素材打清权通过标记，未杜撰署名。产品界面、肖像和图中标志作为来源示例展示，不声称是 Cogine AI 的客户、团队或产品。源设计/图片的实际权利仍归相应权利人。

两个视频框位于 Vacanza 第17页和 UX 第32页。只打包缩略图并保留原视频在线链接，没有下载视频载荷；播放需要网络。视频和缩略图的来源登记不等于取得离线视频分发许可。

完整盘点见[机器可读记录](template-license-audit-2026-11-07.json)。每套另有 `SOURCE-NOTICES.md`、`ASSET-LICENSES/FONT-NOTICES.txt` 和 `ASSET-LICENSES/source-register.json`。后者是来源登记，**不是已清权的 manifest**；既有资产验证器没有被改弱，也没有将本批声明为资产清权全通过。
