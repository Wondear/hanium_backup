from flask import Flask, Response

from pyCode import CompareAnalyze as cop
from pyCode import StoreSQL as Store

conn = Store.ConnectionPool(1,10)

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route("/")
def helloworld():
    return "Hello World"

#테스트 
@app.route("/test")
def testroute():
    testdata = {'CTPRVN_NM': '부산광역시',
    'ADONG_NM': '광안1동',
    'INDS_Scale': 'small',
    'QUARTER': '2301'}
    result, _= Store.query_store_data_to_dataframe(conn, testdata)
    response = Response(result, content_type="application/json; charset=utf-8")
    return result

#기본 서치
@app.route("/search/<region>/<dong>/<quater>")
def search( region,dong,quater):
    data =  {'CTPRVN_NM': region,
    'ADONG_NM':  dong,
    'INDS_Scale': 'small',
    'QUARTER': quater}

    result, temp= Store.query_store_data_to_dataframe(conn, data)
    #response = Response(result, content_type="application/json; charset=utf-8")
    return result.to_json(force_ascii=False)

#비교분석 > 분기 추가 예정
@app.route("/comp/<region1>/<dong1>/<region2>/<dong2>/<scale>/<quater>")
def comp( region1,dong1,region2,dong2,scale, quater):
    data1 =  {'CTPRVN_NM': region1,
    'ADONG_NM':  dong1,
    'INDS_Scale': scale,
    'QUARTER': quater}
    data2 =  {'CTPRVN_NM': region2,
    'ADONG_NM':  dong2,
    'INDS_Scale': scale,
    'QUARTER': quater}
    result1,_= Store.query_store_data_to_json(conn, data1)
    print(type(result1))
    result2,_= Store.query_store_data_to_json(conn, data2)
    result= cop.CompareAnalyze(result1,result2,scale,top_n=10)
    #response = Response(result, content_type="application/json; charset=utf-8")
    return result

#인구수 카운트
@app.route("/popula/<region>/<gu>/<quater>")
def population(region, gu, quater):
    data = {
        'CTPRVN_NM': region,
        'SIGNGU_NM': gu,
        'QUARTER': quater
    }

    result = Store.query_population_data_to_json(conn, data)
    return result


#점포수 카운트
@app.route("/storeCount/<region>/<gu>/<quater>")
def storeCount(region, gu,quater):
    data = {
        'CTPRVN_NM': region,
        'SIGNGU_NM': gu,
        'QUARTER': quater
    }
    result = Store.query_store_count_gu_to_json(conn,data)
    return result



if __name__ == "__main__":
    app.run(host="0.0.0.0")

# 다른 애플리케이션 객체를 따로 만들지 않습니다.

