#include<stdio.h>
#include<windows.h>

int main()
{
	int a,b,c,all,all1,all2,all3;//���ڴ洢����
	printf("��������������������");
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
	
	printf("���յõ�������Ϊ%d\n",all);
	system("pause");
	return 0;
}
