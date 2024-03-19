#include<stdio.h>
#include<windows.h>

int main()
{
	int a,b,c,all,all1,all2,all3;//用于存储数字
	printf("请输入你想抽出的三张牌");
	scanf("%d %d %d",&a,&b,&c);
	int tot=a+b+c;
	
	if("a==1||b==1||c==1")
	{
	  if(tot>21)
	  all=tot;
	  else
	  {if(a==1)
	    all1=tot+10;
	  else
	    all1=tot;
	    
	  if(b=1)
	  	all2=all1+10;
	  else
	    all2=all1;
	    
	  if(c=1)
	  	all3=all2+10;
	  else
	    all3=all2; 
	    
	    all=all3;}
    }
    
	else 
	all=tot;
	
	printf("最终得到的数字为%d\n",all);
	system("pause");
	return 0;
}
