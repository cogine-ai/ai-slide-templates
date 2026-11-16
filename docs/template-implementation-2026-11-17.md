# 六套完整模板制作与验收

2026-11-17，Asia/Taipei。按用户确认的六套候选完成全部 **151 页**。每套均保留全部来源页面及其顺序；151 页不是151种互不重复的布局。模板库由81套、1,183页增至 **87套、1,334页**。

| 模板 | 页数 | 成品 | 实际字体与视觉系统 |
|---|---:|---|---|
| Lattice / Pitch | 27 | [完整 HTML](../templates/lattice-tech/template.html) | Roboto、Roboto Mono、Carlito；深蓝底、荧光黄线框、网格、设备框、渐变人物、面积图、表格与里程碑 |
| Billiard / Hrvoje Grubišić | 29 | [完整 HTML](../templates/billiard-editorial/template.html) | Open Sauce Sans、Gelasio；浅灰与白底、砖红标题、黑白摄影、细线、多栏编辑排版与引文 |
| Brand Style Guide / Andrea Jelić | 19 | [完整 HTML](../templates/brand-style-guide-editorial/template.html) | 原源文件 Agate（内部名 QTAgateType）、Nimbus Sans L；粉、森林绿、纸灰、竖排大标题、字样、色板、标志、摄影、网格与图标 |
| Case Study / Bakken & Bæck | 46 | [完整 HTML](../templates/bakken-case-study/template.html) | Standard、Fira Code；黑色页眉、米白叠页、细圆角、渐变项目图、范围、时间线、概念、代码、结果与图表 |
| Lumenfield / Slides official | 14 | [完整 HTML](../templates/lumenfield-festival/template.html) | League Gothic、Lato；深色、紫粉青几何、大写窄体、路线、节目、人物与活动信息 |
| Plotwise / Slides official | 16 | [完整 HTML](../templates/plotwise-startup/template.html) | Merriweather Sans、Oxygen；奶油、深绿、鼠尾草绿、黄橙圆角模块、产品、市场、商业模式、路线图与融资 |

采用用户选定的19页 Andrea Jelić 版本和46页 Bakken & Bæck 版本，没有换成同名的其他模板。每份 metadata 都包含全部页面的 `layouts`、`layout_slots`，与 HTML 命名槽位对应，共 **1,252个槽位**。

## 还原方式

四套 Pitch 来源按1920×1080画布恢复块级坐标、旋转、顺序、字框、字重、行距、字距、颜色、渐变、图像裁切与滤镜。背景图按来源的背景角色铺满画布；圆角按源文件的相对直径语义计算。Lumenfield、Plotwise 按原1280×720画布保留完整文字、形状、原生 SVG、嵌套强调及原示例叙事，替换作者/年份等运行时变量。

文字、形状、线条、一张表格和三个图表保留为 HTML/SVG。Lattice 两张面积图保留原数据及单调插值曲线；Case Study 保留原图表 SVG 与相邻数据。修改数据时需同步标签和几何。没有以整页截图代替模板，也没有打包 Pitch 或 Slides 应用运行时。图像中的产品画面仍是可替换图片，代码示例和原生插画仍是展示内容。

四套 Pitch 的部分说明文案整理为 Atlas Data、Night Shift、Folio、Northline 等虚构示例，保留原字框与字号；文案超框时缩短完整句子。不是逐字抄写原站全部占位说明。未缩小字体、改配色或混用不同模板的页面。

字体全部内嵌，共13个家族、73条字体声明。Pitch 的 Open Sauce Sans、Agate、Nimbus Sans L、Standard、Carlito 保留实际源 CDN 原文件；Roboto、Roboto Mono、Gelasio、Fira Code 使用相同家族的官方文件，登记实际版本与哈希，不声称字节版本与原站历史 CDN 完全一致。两套 Slides 保留实际发布主题的原始静态 WOFF。Plotwise 标题是 **Merriweather Sans**，并非衬线 Merriweather；Brand 字体样本也标注实际实现的 Agate / Nimbus Sans L。

四套 Pitch 共106条逐模板去重图片载荷记录，不等于106张独立照片。小 SVG 保留原字节，大型 SVG 与位图使用高质量 WebP，最长边不超过2560像素；视频封面保留来源载荷。来源和实际嵌入哈希分别登记。

独立导航提供前后按钮、方向键、PageUp/PageDown、Home/End、页码选择、进度、URL 页码定位、触摸翻页及打印样式。交互元素保留原生键盘行为，隐藏页面设为 inert。

## 视频与来源记录

三处视频页均有原封面。Billiard 第11页链接至原 Vimeo；Case Study 第5页链接至经原媒体 JSON 确认的 JW Player 预览。视频载荷未打包，播放需要网络。

Lattice 第14页无签名的 Mux 接口返回 `Not Authorized`。从公开 Pitch 图库中实际显示的签名资源取得原720像素封面，保留原裁切、滤镜和视频框；不保存会过期的签名。该页播放入口链接至原模板页面，不能声称内嵌原视频或离线播放通过。

每套附 `SOURCE-NOTICES.md`、`ASSET-LICENSES/FONT-NOTICES.txt` 和 `ASSET-LICENSES/source-register.json`，字体原始名称表、版权信息、来源 URL、字节哈希随模板保留。OFL 家族附许可全文。Agate/QTAgateType、Nimbus Sans L 特定源二进制的完整再分发条款仍未由名称表建立；记录明确保留这一点，没有替换字体、冒称 MIT 或给出整体清权声明。

第三方设计、图片、字体保留各自权利；独立实现代码适用仓库 MIT。新增模板使用来源登记，未声明 `asset_license_manifest`，未改动素材清权验证逻辑。用户另行要求全面复核后提交 PR；提交前修正与验证见[全面复核记录](template-review-2026-11-17.md)。不包含合并或部署。

## 验收范围

以下结果已按提交前全面复核后的最终成品刷新，字体检查增加实际字形来源核对；图片裁切146处均已对照原站。

机器可读结果与最终成品哈希见 [验收摘要](template-implementation-2026-11-17.acceptance.json)。

- `node scripts/validate.mjs`：87套结构、元数据、布局槽位和总数规则通过。
- `node scripts/validate-visual.mjs`：新增六套在1280×720通过。
- 151页断网渲染：全部图片解码；73条字体声明全部加载；无外部加载、脚本或控制台错误。
- 文字框检查：未发现非预期超框。两项原始信号经人工对照保留：Brand 第2页90度旋转字框的包围盒与未旋转文字高度不可直接比较；Lumenfield 第10页大引号采用原始160px装饰框及300px行盒，原站同样如此。没有通过缩字号或移动原构图消除这些原设计特征。
- 六套的按钮、空格键方向、页码、Home/End、URL 刷新、窄屏适配、媒体链接空格键保护、合成触摸和单页预览标题替换均通过。
- 查看六套全部页面的联系表，并对照原站查看封面、圆角叠页、人物渐变、引文等代表页面；不是对151页逐像素人工比对的声明。
- `node scripts/validate-assets.mjs`：既有六份素材清单通过；其余81套未由清权工具评估，包含本批六套。
- 未进行真实触屏、Windows/Linux或其他浏览器验收。合成触摸不是实际移动设备验收；未声称视频离线播放通过。

本地总览入口：`previews/implementation-2026-11-17/index.html`。全部单页截图、联系表、公开来源快照、字体/媒体下载记录及渲染记录位于该忽略目录；新克隆保留六份完整成品、来源通知、机器可读登记、验收摘要及 README 图库。
