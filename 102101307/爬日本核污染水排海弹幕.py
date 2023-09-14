import requests
import time
import os
import pandas as pd #保存csv数据
import re #数据清洗
import jieba #结巴分词
import wordcloud
import openpyxl
from collections import Counter
from PIL import Image
import numpy as np
img = np.array(Image.open('词云图背景.png'))


def get_bvid(v_keyword,v_max_page):#获取bvid号和cid号，然后获取弹幕
    for page in range(1,v_max_page+1):
        url = 'https://api.bilibili.com/x/web-interface/wbi/search/type'
        headers = {
            'Accept': 'application / json, text / plain, * / *',
            'Cookie': "buvid3=F1231107-9337-9F80-4BE1-2652CD15B5B080498infoc; b_nut=1694596780; i-wanna-go-back=-1; b_ut=7; _uuid=710AD9810D-E738-F32E-C391-698D5E87D1E978062infoc; buvid_fp=84ead4915977a73c351e4df30f16932a; home_feed_column=5; browser_resolution=1536-747; buvid4=CB753812-9559-5BE1-A948-1FF96156A98F81856-023091317-SK3hbof5R8lG8tHbfKiz5LUi9h1jbYXeLy39nVpL0a0WYzNyka8nqQ%3D%3D; CURRENT_FNVAL=4048; b_lsid=24C43972_18A8E3B344A; rpdid=|(u))kkYu|~l0J'uYmRY|JJYk; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ4NjI1NjIsImlhdCI6MTY5NDYwMzM2MiwicGx0IjotMX0.xzkhNoBSoQMRIj4xFGMmt3JpkvYC7DPDZrPdQFaDOj0; bili_ticket_expires=1694862562; SESSDATA=9309c915%2C1710155461%2C24dea%2A91CjAc3IdB6562lxKwTE2Op53Hy4CoKTE7XxYEwgavnFAxUMaECyMKJwFayJagVMvJz0cSVlI3UnJlUXo5TGoybklvTDJmS1lqWkFhcDY0NGdOcmM2c0dOTFljWENobng4MDdJT2U5eTdvRDFJUW92aDRUZzFtX2tVa0NlU0F0blJmUzBrQkVmSEl3IIEC; bili_jct=75f4bd7c97b35deb4a300baf038a75ff; DedeUserID=2033879113; DedeUserID__ckMd5=401d64524b1e22cc; PVID=1; innersign=0; header_theme_version=CLOSE; sid=81i6bmf9",
            'Referer': 'https://search.bilibili.com/video?keyword=%E6%97%A5%E6%9C%AC%E6%A0%B8%E6%B1%A1%E6%9F%93%E6%B0%B4%E6%8E%92%E6%B5%B7&from_source=webtop_search&spm_id_from=333.1007&search_source=3&page=4&o=72',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        }
        params = {
            '__refresh__': 'true',
            '_extra': '',
            'context: ': '',
            'page': page,
            'page_size': 30,
            'from_source': '',
            'from_spmid': '333.337',
            'platform': 'pc',
            'highlight': '1',
            'single_column': '0',
            'keyword': v_keyword,
            'qv_id': 'cpMVbw8zVemJGJvGYYMOebJCmI59wcxs',
            'ad_resource': '5654',
            'source_tag': '3',
            'gaia_vtoken': '',
            'category_id': '',
            'search_type': 'video',
            'dynamic_offset': 36,
            'web_location': '1430654',
            'w_rid': 'd4218a3244a08402538973f95d2b2887',
            'wts': '1694605881'
        }
        r = requests.get(url,headers=headers,params=params)
        j_data = r.json()
        data_list = j_data['data']['result']
        for index in data_list:
            bvids = index['bvid']#为每一个视频的bvid号
            #print(bvids)
            url1 = f'https://api.bilibili.com/x/player/pagelist?bvid={bvids}&jsonp=jsonp'#获取每一个视频的地址
            t1 = requests.get(url=url1, headers=headers)
            t2 = t1.text
            s3 = '"cid":'
            cout3 = t2.find(s3)
            cid = t2[cout3 + 6:cout3 + 16]
            url2 = 'https://api.bilibili.com/x/v1/dm/list.so?oid={}'.format(cid)
            #print(url2)
            res = requests.get(url=url2, headers=headers)
            res.encoding = res.apparent_encoding

            #把弹幕写进txt文本
            data_list = re.findall('<d p=".*?">(.*?)</d>', res.text)
            for dan in data_list:
                with open('zong弹幕.txt', mode='a', encoding='utf-8') as f:
                    f.write(dan)
                    f.write('\n')
                    #print(dan)


def cloud():    #绘制词云图词yun
    f = open('zong弹幕.txt', encoding='utf-8')
    text = f.read()
    text_list = jieba.lcut(text)  # 进行分词
    text_str = ''.join(text_list)
    # 接下来为词云图配置
    wc = wordcloud.WordCloud(
        width=500,  # 宽度
        height=500,  # 高度
        background_color='white',  # 背景颜色
        stopwords={'了', '的', '啊', '是', '吧'},  # 停用字，词云图不会显示
        font_path='msyh.ttc', # 字体颜色
        mask = img,
        collocations = False#防止词云图出现重复单词
    )
    wc.generate(text_str)
    wc.to_file('词yuntu.png')


def excel_danmu():    #把弹幕读入excel表格并输出前20个
    with open('zong弹幕.txt', 'r', encoding='utf-8') as file:
        text = file.read().splitlines()

    # 统计元素出现次数
    counts = Counter(text)

    # 转换为DataFrame并按降序排列
    df = pd.DataFrame(list(counts.items()), columns=["Element", "Count"])
    df = df.sort_values("Count", ascending=False)

    # 写入Excel表格
    df.to_excel("总results.xlsx", index=False)
    # 读取Excel文件
    df = pd.read_excel('总results.xlsx')

    # 获取弹幕对应列表的前二十个数据进行输出
    column_data = df['Element'].head(20)
    print(column_data)


if __name__=='__main__':
    search_keyword = '日本核污染水排海'
    max_page = 10
    get_bvid(v_keyword=search_keyword.encode('utf8'),
             v_max_page=max_page
             )
    cloud()
    excel_danmu()
