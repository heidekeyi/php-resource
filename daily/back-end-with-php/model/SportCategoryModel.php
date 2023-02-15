<?php

namespace daily\model\SportCategoryModel;

use daily\model\base\BaseNameModel\BaseNameModel;

class SportCategoryModel extends BaseNameModel
{
    static protected array $table = ['sport', 'category'];
    static private string $db = <<<A
create table daily_sport_category (
    daily_sport_category_id int primary key auto_increment,
    daily_sport_category_createTime bigint not null,
    daily_sport_category_nameId int unique not null
) charset = utf8 engine = InnoDB;
A;
    static private string $name = <<<A
    chest expander 扩胸器；
    pull-up 引体向上；
    push-up 俯卧撑；
    sit-up 仰卧起坐；
    jogging 慢跑；
    barbell 杠铃；
    dumbbell 哑铃；
    treadmill 跑步机；
    squats 蹲下起立；
    jumping jacks 跳爆竹；
    jump rope 跳绳；
    leg extension 前腿肌伸展；
    leg curl 屈腿练习
    腹肌轮
    扩胸器
    拱桥
    俯卧撑
A;
}