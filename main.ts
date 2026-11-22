import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',P=[0,0,0,1,1,2,2,3],Q=[0,1,1,0,2,2,3,3];
for(const d of readdirSync(I).sort()){
const p=readFileSync(join(I,d,'program.bin')),q=readFileSync(join(I,d,'input.bin')),D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,x=0,t=0,l=0,j=0,e=0;
L:for(;;){
if(t==1e6){e=10;break}
if(x<0||x>=p.length){e=9;break}
const n=p[x];
let m=0,u=0,v=0,g=1;
if(n<8){m=n==1?1:n==2?4:0;u=P[n];v=Q[n]}
else if(n>15&&n<35){if(n==31)g=0;else{u=n==23||n==27?1:2;v=1}}
else if(n>47&&n<53){m=n<52?2:0;u=n==49||n==50?1:0}
else if(n==64)u=v=1;
else if(n==65)u=2;
else if(n>79&&n<84){u=n==82?0:1;v=n==82?1:0}
else g=0;
if(!g){e=5;break}
if(x+m>=p.length){e=9;break}
t++;const y=x+1+m;
if(s<u){e=2;break}
if(s-u+v>256){e=3;break}
x=y;
if(n==0){e=0;break}
else if(n==1)D[s++]=(p[y-1]<<24)>>24;
else if(n==2)D[s++]=p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24;
else if(n==3)s--;
else if(n==4){D[s]=D[s-1];s++}
else if(n==5){const w=D[s-1];D[s-1]=D[s-2];D[s-2]=w}
else if(n==6){D[s]=D[s-2];s++}
else if(n==7){const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a}
else if(n==23)D[s-1]=-D[s-1]|0;
else if(n==27)D[s-1]=~D[s-1];
else if(n>15&&n<35){
const b=D[s-1],a=D[s-2];let r;
if(n==16)r=a+b|0;
else if(n==17)r=a-b|0;
else if(n==18)r=Math.imul(a,b);
else if(n==19){if(!b){e=4;break L}r=a==-2147483648&&b==-1?a:a/b|0}
else if(n==20){if(!b){e=4;break L}r=b==-1?0:a%b|0}
else if(n==21){if(!b){e=4;break L}r=Math.floor((a>>>0)/(b>>>0))|0}
else if(n==22){if(!b){e=4;break L}r=(a>>>0)%(b>>>0)|0}
else if(n==24)r=a&b;
else if(n==25)r=a|b;
else if(n==26)r=a^b;
else if(n==28)r=a<<(b&31);
else if(n==29)r=a>>(b&31);
else if(n==30)r=(a>>>(b&31))|0;
else if(n==32)r=a==b?1:0;
else if(n==33)r=a<b?1:0;
else r=a>>>0<b>>>0?1:0;
s-=2;D[s++]=r;
}else if(n>47&&n<53){
if(n==48)x=y+(((p[y-2]|p[y-1]<<8)<<16)>>16);
else if(n==51){if(c==64){e=7;break L}C[c++]=y;x=p[y-2]|p[y-1]<<8}
else if(n==52){if(!c){e=8;break L}x=C[--c]}
else{const w=D[--s],k=((p[y-2]|p[y-1]<<8)<<16)>>16;if((n==49)==(w==0))x=y+k}
}else if(n==64){const a=D[s-1];if(a<0||a>255){e=6;break L}D[s-1]=M[a]}
else if(n==65){const a=D[s-1],w=D[s-2];if(a<0||a>255){e=6;break L}s-=2;M[a]=w}
else if(n==80){const z=''+D[s-1];if(l+z.length>65536){e=11;break L}s--;for(let i=0;i<z.length;i++)o[l++]=z.charCodeAt(i)}
else if(n==81){if(l+1>65536){e=11;break L}o[l++]=D[--s]&255}
else if(n==82)D[s++]=j<q.length?q[j++]:-1;
else{e=D[--s]&255;break L}
}
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,'stdout.bin'),o.slice(0,l));
writeFileSync(join(O,d,'exit.txt'),e+'\n');
}
