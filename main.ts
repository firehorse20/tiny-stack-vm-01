import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const T=`!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%"%`;
function run(p,i){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,q=0,pc=0,n=0;
const e=v=>({o:o.slice(0,l),e:v});
for(;;){
if(n===1e6)return e(10);
if(pc<0||pc>=p.length)return e(9);
const b=p[pc],k=T.charCodeAt(b)-33;
if(!(k>=0))return e(5);
const im=k>>4,po=(k>>2)&3,pu=k&3;
if(pc+im>=p.length)return e(9);
n++;
const x=pc+1+im;
if(s<po)return e(2);
if(s-po+pu>256)return e(3);
pc=x;
switch(b){
case 0:return e(0);
case 1:D[s++]=(p[x-1]<<24)>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 0x17:D[s-1]=-D[s-1]|0;break;
case 0x1b:D[s-1]=~D[s-1];break;
case 0x30:case 0x31:case 0x32:{
const r=((p[x-2]|p[x-1]<<8)<<16)>>16;
let t=1;
if(b!==0x30){const v=D[--s];t=b===0x31?v===0:v!==0;}
if(t)pc=x+r;
break;}
case 0x33:if(c===64)return e(7);C[c++]=x;pc=p[x-2]|p[x-1]<<8;break;
case 0x34:if(!c)return e(8);pc=C[--c];break;
case 0x40:{const a=D[s-1];if(a<0||a>255)return e(6);D[s-1]=M[a];break;}
case 0x41:{const a=D[s-1],v=D[s-2];if(a<0||a>255)return e(6);s-=2;M[a]=v;break;}
case 0x50:{const w=String(D[s-1]);if(l+w.length>65536)return e(11);s--;for(let j=0;j<w.length;j++)o[l++]=w.charCodeAt(j);break;}
case 0x51:if(l+1>65536)return e(11);o[l++]=D[--s]&255;break;
case 0x52:D[s++]=q<i.length?i[q++]:-1;break;
case 0x53:return e(D[--s]&255);
default:{
const y=D[s-1],a=D[s-2];
let r=0;
if(b===0x10)r=(a+y)|0;
else if(b===0x11)r=(a-y)|0;
else if(b===0x12)r=Math.imul(a,y);
else if(b===0x13){if(!y)return e(4);r=a===-2147483648&&y===-1?a:(a/y)|0;}
else if(b===0x14){if(!y)return e(4);r=y===-1?0:(a%y)|0;}
else if(b===0x15){if(!y)return e(4);r=Math.floor((a>>>0)/(y>>>0))|0;}
else if(b===0x16){if(!y)return e(4);r=(a>>>0)%(y>>>0)|0;}
else if(b===0x18)r=a&y;
else if(b===0x19)r=a|y;
else if(b===0x1a)r=a^y;
else if(b===0x1c)r=a<<(y&31);
else if(b===0x1d)r=a>>(y&31);
else if(b===0x1e)r=(a>>>(y&31))|0;
else if(b===0x20)r=a===y?1:0;
else if(b===0x21)r=a<y?1:0;
else r=(a>>>0)<(y>>>0)?1:0;
s-=2;D[s++]=r;
}}}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(I).sort()){
const r=run(new Uint8Array(readFileSync(join(I,d,'program.bin'))),new Uint8Array(readFileSync(join(I,d,'input.bin'))));
mkdirSync(join(O,d),{recursive:!0});
writeFileSync(join(O,d,'stdout.bin'),r.o);
writeFileSync(join(O,d,'exit.txt'),r.e+'\n');
}
