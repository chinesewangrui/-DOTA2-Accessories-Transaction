SET NAMES utf8;
DROP DATABASE IF EXISTS dota2;
CREATE DATABASE dota2 CHARSET=UTF8;
USE dota2;
-- # 网站的基本信息
CREATE TABLE dota2_site_info(
    sitename VARCHAR(16),
    logo VARCHAR(64),
    copyright VARCHAR(64)
);

-- #导航条目
CREATE TABLE dota2_nav_item(
    title VARCHAR(16),
    url  VARCHAR(64)
);

-- #轮播图
CREATE TABLE dota2_rot_pic(
    rid INT PRIMARY KEY AUTO_INCREMENT,
    pic VARCHAR(128),
    url VARCHAR(128),
    title VARCHAR(32)
);

-- #最新上架饰品
CREATE TABLE dota2_new_product(
    nid INT PRIMARY KEY AUTO_INCREMENT,
    img VARCHAR(128),
    pname VARCHAR(32),
    price DECIMAL(7,2),
    url  VARCHAR(128)
);

-- #热门饰品
CREATE TABLE dota2_hot_product(
    hid INT PRIMARY KEY AUTO_INCREMENT,
    img VARCHAR(128),
    pname VARCHAR(32),
    price DECIMAL(7,2),
    number INT,     #交易数量
    url  VARCHAR(128)
);

--# DOTA2英雄家族
CREATE TABLE dota2_heros(
    hid INT PRIMARY KEY AUTO_INCREMENT,
    hname VARCHAR(32),
    hpro  VARCHAR(32), /*英雄属性  智力 力量 敏捷*/
    pic VARCHAR(64)
);
INSERT INTO dota2_heros VALUES(),
--#所有饰品
CREATE TABLE dota2_product(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    hero_id INT,    #所属英雄编号
    pic VARCHAR(32),
    pname VARCHAR(32),  #商品名称
    qua VARCHAR(32),   #饰品品质
    slot  VARCHAR(12),  #槽位
    type  VARCHAR(20),  #饰品类型
    price  DECIMAL(7,5), #价格
    is_onsale BOOLEAN    #是否在售
);
-- #用户信息
CREATE TABLE dota2_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  avatar VARCHAR(128),        --#头像图片路径
  user_name VARCHAR(32),      --#用户名，如王小明
  gender INT                  --#性别  0-女  1-男
);
/**收货地址信息**/
CREATE TABLE dota2_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,                --#用户编号
  receiver VARCHAR(16),       --#接收人姓名
  province VARCHAR(16),       --#省
  city VARCHAR(16),           --#市
  county VARCHAR(16),         --#县
  address VARCHAR(128),       --#详细地址
  cellphone VARCHAR(16),      --#手机
  fixedphone VARCHAR(16),    -- #固定电话
  postcode CHAR(6),           --#邮编
  tag VARCHAR(16),            --#标签名

  is_default BOOLEAN          --#是否为当前用户的默认收货地址
);
/**购物车条目**/
CREATE TABLE dota2_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      --#用户编号
  product_id INT,   --#商品编号
  count INT,        --#购买数量
  is_checked BOOLEAN --#是否已勾选，确定购买
);
/**用户订单**/
CREATE TABLE dota2_order(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  address_id INT,
  status INT,            -- #订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消
  order_time BIGINT,     -- #下单时间
  pay_time BIGINT,        --#付款时间
  deliver_time BIGINT,    --#发货时间
  received_time BIGINT    --#签收时间
);
/**用户订单**/
CREATE TABLE dota2_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,           #订单编号
  product_id INT,         #产品编号
  count INT               #购买数量
);
/*插入数据*/
/*网站信息*/
INSERT INTO dota2_site_info VALUES("DOTA2 饰品交易平台","img/logo.png","温馨提示：抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益 沉迷游戏伤身 合理安排时间 享受健康生活");
/*导航条目*/
INSERT INTO dota2_nav_item VALUES
("首页","public/index.html"),
("饰品市场","public/acce.html"),
("电竞资讯","public/gameinf.html");
/*轮播图*/
INSERT INTO dota2_rot_pic VALUES
("1","img/l1.png","public/art1.html","至宝归属，花落谁家"),
("2","img/l2.png","public/art2.html",null),
("3","img/l3.png","public/art3.html",null),
("4","img/l4.png","public/art4.html",null);
/*最新上架*/
INSERT INTO dota2_new_product VALUES
("1","img/newproduct/001.png","纯正 真神炙剑","￥59.00","#"),
("2","img/newproduct/002.png","铭刻 纯金月陨","￥129.00","#"),
("3","img/newproduct/003.png","凌虐之罩","￥128.00","#"),
("4","img/newproduct/004.png","彼岸材枝","￥89.00","#"),
("5","img/newproduct/005.png","纯金风暴之诞神令","￥128.00","#"),
("6","img/newproduct/006.png","守夜丰功","￥345.00","#"),
("7","img/newproduct/007.png","铭刻 噬魔之王","￥135.00","#"),
("8","img/newproduct/008.png","尊享 魔导师密匙","￥155.00","#"),
("9","img/newproduct/001.png","纯正 真神炙剑","￥59.00","#"),
("10","img/newproduct/008.png","尊享 魔导师密匙捆绑包","￥161.00","#");
/*热销商品*/
INSERT INTO dota2_hot_product VALUES
("1","img/hotproduct/h1.png","纯金食腐婪虫",79,22,"#"),
("2","img/hotproduct/h2.png","铭刻 雪女冰川",8.46,22,"#"),
("3","img/newproduct/001.png","纯正 真神炙剑",26.91,22,"#"),
("4","img/newproduct/003.png","凌虐之罩",54.99,22,"#"),
("5","img/hotproduct/h3.png","破晓之翼",5.00,22,"#"),
("6","img/hotproduct/h4.png","魔方之谜",2.50,22,"#"),
("7","img/hotproduct/h5.png","观战：",2.01,22,"#"),
("8","img/hotproduct/h6.png","2017年不朽宝藏",0.45,22,"#"),
("9","img/hotproduct/h7.png","金姝之匕",0.02,22,"#"),
("10","img/hotproduct/h8.png","新月战刃",0.02,22,"#");


















