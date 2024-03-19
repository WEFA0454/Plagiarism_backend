//21点游戏//
//2302李蔚然23301040//
//2023.9.27//
#include<stdio.h>
int main()
{
	int a,b,c,n;
	printf("Enter tne three cards values\n");
	scanf("%d %d %d",&a,&b,&c);//输入数据//
	
	if(a>=10){
	a=10;
	}
	if(b>=10){
	b=10;	
	}
	if(c>=10){
	c=10;
	}//更改J,Q,K为10//
	if(a==1||b==1||c==1){
	if(a+b+c>=21){
		printf("The total value is 21");//当1存在且三数相加大于等于21时//
	}
	else{
		if(a==1){
			a=11;
			n=a+b+c;
			printf("The total value is %d",n);
		}
		else if(b==1){
		    b=11;
			n=a+b+c;
			printf("The total value is %d",n);
		}
		else if(c==1){
			c=11;
			n=a+b+c;
			printf("The total value is %d",n);
		}
	}	//将1更改为11相加//
	}
	else{
		n=a+b+c;
		printf("The total value is %d",n);
	}	//1不存在则正常运算//
	return 0;
}
