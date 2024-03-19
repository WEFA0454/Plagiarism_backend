/*Programmer:Xuerui Ren    date:9.25*/
#include <stdio.h>
#include <stdio.h>
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[])
 {
	int num1,num2,num3,sum;/*定义变量*/
	scanf("a %d,a %d,a %d",&num1,&num2,&num3);/*输入三个数字*/
	if(num1>10) num1=10;/*if语句判断*/ 
	if(num2>10) num2=10;/*if语句判断*/
	if(num3>10) num3=10;/*if语句判断*/
	sum=num1+num2+num3; /*sum的计算式*/
	if(num1==1||num2==1||num3==1)/*if语句判断*/ 
	{
		if(sum<=21) /*if语句判断*/ 
		{
		sum=sum+10;/*sum的计算式*/ 
		printf("三张牌的总价值为%d",sum);/*输出三张牌的总价值*/
	    }
		else       /*if语句判断*/ 
		{
		sum=sum;/*sum的计算式*/
		 printf("三张牌的总价值为%d",sum);/*输出三张牌的总价值*/
	}
	}
    else printf("三张牌的总价值为%d",sum);   /*if语句判断*/ 
	return 0;
}
