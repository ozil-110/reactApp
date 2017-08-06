import User from '../Models/user';
const userEntity = new User();
export default function(req,res,next){
    userEntity.getUser(null,(err,users)=>{
        if(err){
            return res.status(500).end('服务器错误');
        }
        let result = users.sort((a,b)=>{
            return b.score - a.score
        })
        let toSend = result.slice(0,10).map((user,i)=>{
            return {
                name: user.name,
                score: user.score
            }
        })
        return res.status(200).json(toSend)
    })
}