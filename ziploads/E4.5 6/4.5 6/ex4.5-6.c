/*Programmer:Xuerui Ren    date:9.25*/
#include <stdio.h>
#include <stdio.h>
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[])
 {
	int num1,num2,num3,sum;/*�������*/
	scanf("a %d,a %d,a %d",&num1,&num2,&num3);/*������������*/
	if(num1>10) num1=10;/*if����ж�*/ 
	if(num2>10) num2=10;/*if����ж�*/
	if(num3>10) num3=10;/*if����ж�*/
	sum=num1+num2+num3; /*sum�ļ���ʽ*/
	if(num1==1||num2==1||num3==1)/*if����ж�*/ 
	{
		if(sum<=21) /*if����ж�*/ 
		{
		sum=sum+10;/*sum�ļ���ʽ*/ 
		printf("�����Ƶ��ܼ�ֵΪ%d",sum);/*��������Ƶ��ܼ�ֵ*/
	    }
		else       /*if����ж�*/ 
		{
		sum=sum;/*sum�ļ���ʽ*/
		 printf("�����Ƶ��ܼ�ֵΪ%d",sum);/*��������Ƶ��ܼ�ֵ*/
	}
	}
    else printf("�����Ƶ��ܼ�ֵΪ%d",sum);   /*if����ж�*/ 
	return 0;
}
