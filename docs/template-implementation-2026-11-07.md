# 新增展示模板制作与验收

2026-11-07，Asia/Taipei。本批完成 **6套、186页**，该批完成时模板库为 **80套、1,165页**；[后续历史补位](template-count-repair-2026-11-07.md)完成后为81套、1,183页。用户接受的六套候选全部完成。Sports Partnership Proposal 经用户进一步授权，以相似的 OFL DM Sans 替换 General Sans；保留 Geist Mono、原构图、原字号和32页全部布局。未打包 General Sans 字体文件，明确标注为相似字体改编版。

| 模板 | 页数 | 成品 | 保留的视觉系统 |
|---|---:|---|---|
| Vacanza | 29 | [完整 HTML](../templates/vacanza-postcard/template.html) | Butler / Inter、奶油纸色、深蓝标题、邮戳、明信片摄影、时间线、图表、表格与摄影变体 |
| Tone of Voice Guidelines | 30 | [完整 HTML](../templates/brand-voice-guidelines/template.html) | DM Serif Display / Inter、黑底、橙圆、建筑摄影、品牌原则、写作示例与语气布局 |
| UX Design Strategy | 35 | [完整 HTML](../templates/ux-strategy-workshop/template.html) | DM Sans / DM Mono / IBM Plex Mono、石纹圆形、低饱和分节、路线图、图表、证据表与工作坊 |
| Launch | 35 | [完整 HTML](../templates/software-launch-blue/template.html) | DM Sans、浅灰底、蓝色渐变、原设备图框、产品截图、功能拼图、流程高亮与定价变体 |
| Indie Publishing | 25 | [完整 HTML](../templates/indie-publishing-editorial/template.html) | Manrope、彩色纸面、黑白摄影、底部大标题、目录及多栏编辑网格 |
| Sports Partnership Proposal | 32 | [完整 HTML](../templates/sports-partnership-proposal/template.html) | DM Sans 真实粗斜体替换 General Sans，保留 Geist Mono、黑白橙、大写斜体、运动摄影、合作权益、受众、图表、问答与行动计划 |

每套保留全部来源页面的顺序和布局变体；186页并非186种独立布局。元数据含完整 `layout_slots`，共 **1,313个命名槽位**，与 HTML 的 `data-slot` 对应。没有重写成另一套原创构图，也没有合并不同模板的设计系统。

## 实现与内容

原画布为1920×1080。逐块保留源位置、大小、旋转、层次、颜色、字体角色与字重、图像裁切和滤镜；每套保留独立字体系统；Sports 按用户授权使用 DM Sans 替代 General Sans，真实斜体文件支持700字重标题，Geist Mono 标签保持原字族。OFL 家族使用官方上游文件，字节版本不冒称与 Pitch 历史 CDN 完全一致。Butler 保留原始 WOFF2；全部字体均未修改。

文字、形状、线条、表格和8个图表以独立编写的 HTML/SVG 实现，没有把整张来源截图设为背景，没有打包 Pitch 应用运行时。图表保留数据、颜色与所在构图，使用原生 SVG 重建；并非原平台图表引擎的逐像素或动态编辑器复刻。相邻 JSON 记录图表数据，改数据时需同步 SVG 标签与几何。设备画面本身仍是可替换的图片，不是可交互的真实产品。

示例文案新写为 Fieldnotes、Common Ground、Fieldwork Lab、Clarity、Open Editions 五个虚构项目，Sports 新增虚构 PACE 合作提案，保持原文字框、字体和字号。长文案以完整句子缩写，未通过缩小设计字号塞入。源中完全位于画布外的隐藏文字块保持原坐标但不显示；邮戳字样作为原生 SVG 文字保留原有画布裁边，不扩大画布或移动构图。

每份 HTML 内嵌本地字体与图片。下载167条图片资源，按实际嵌入字节去重；全批有127个逐模板独立图片载荷记录，这不是127张独立照片。位图以高质量 WebP 打包，最长边不超过2560像素；SVG 原字节保留。源字节与嵌入字节哈希、重复来源和使用页码均有登记。

导航独立实现，提供前后按钮、方向键、Home/End、页码选择、进度、URL 页码定位和触摸翻页。工作坊页面是展示布局；计时器图示、便签和投票不声称提供多人协作或实时平台连接。Vacanza 第17页与 UX 第32页保留原视频框、本地缩略图及在线视频链接，没有打包视频载荷，播放需要网络。

## 来源和许可

交付范围由用户明确为“提交公开仓库，并打包字体和图片文件”，并采用明确限制才停止的项目标准。此前因缺少积极许可统一停止六套的门槛已撤回，来源事实和未建立的权利记录继续保留。

自行编写的代码适用仓库 MIT；七个实际使用的开放字体家族保留 OFL。Butler 实际文件内部标识 CC BY-SA 4.0，保留 Fabian De Smet 署名和许可全文。General Sans 未打包，替换关系、实际 DM Sans / Geist Mono 文件哈希与 OFL 文本随 Sports 提交。第三方源设计和图片不声称已整体清权，也不改为 MIT。

每套附 `SOURCE-NOTICES.md`、`ASSET-LICENSES/FONT-NOTICES.txt` 和 `ASSET-LICENSES/source-register.json`。来源登记明确保留未追溯的作者或许可字段，不是清权通过的资产清单。未修改、削弱或绕过既有素材验证器；本批没有声明 `asset_license_manifest`。详见[授权核查](template-license-audit-2026-11-07.md)和[机器可读盘点](template-license-audit-2026-11-07.json)。授权询问信未发送，未购买字体或模板。

## 验收

详见[整个分支的最终自审](template-review-and-ship-2026-11-07.md)。原有“仅检查画布边界”的证据补充了实际文字框高度和单页预览验收；最终文件哈希以验收摘要为准。

- `node scripts/validate.mjs`：80套结构和元数据通过。
- `node scripts/validate-visual.mjs` 六套最终版本全部通过，视口1280×720；检查文字越界、浏览器错误与声明的导航。
- 新增186页逐页断网检查通过：图片全部解码，无脚本/控制台错误，无非预期文字越界。生成全部单页截图和联系表，并人工对照原稿查看封面、全部布局节奏及重点图表/内容页。
- 补充检查按钮、真实键盘事件、页码选择、边界页、URL 定位、缩放和合成触摸翻页；结果见[验收摘要](template-implementation-2026-11-07.acceptance.json)。
- `node scripts/validate-assets.mjs`：既有6份清权清单通过；其余74套未被该清权工具评估，本批六套包含在这74套中。该命令不能用来声称新增媒体已清权。
- `git diff --check` 保留1130处上游字体许可文本的原始 CRLF / 尾部空白提示，位置均限定在字体通知或 HTML 字体许可注释；自编内容的尾部空白已清理，未关闭检查。
- 最终审查修复预览槽位回退、分行标题残留、按钮空格键方向及段落行距，缩短9处超框示例文案。新增7项预览回归覆盖，工具测试43项通过。未修改验证逻辑。未进行真实移动设备、Windows/Linux 或其他浏览器验收；合成触摸不等于真实触屏验收。没有声称视频离线播放通过。

本地成品入口为 `previews/implementation-2026-11-07/index.html`；逐页截图、源布局映射和运行记录保留在该忽略目录。公开仓库保留完整成品、来源/字体通知、机器可读登记、验收摘要与 README 图库；新克隆不包含本地研究截图。
