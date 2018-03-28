import originJSONP from 'jsonp'

export function jsonp(url,data,option)
{
  return new Promise((resolve,reject)=>{
    originJSONP(url,error,(option,data)=>{
    	if(!error){
    		resolve(data)
    	}else{
    		reject(data)
    	}
    })
  })
}