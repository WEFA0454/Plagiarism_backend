//21����Ϸ//
//2302��εȻ23301040//
//2023.9.27//
#include<stdio.h>
int main()
{
	int a,b,c,n;
	printf("Enter tne three cards values\n");
	scanf("%d %d %d",&a,&b,&c);//��������//
	
	if(a>=10){
	a=10;
	}
	if(b>=10){
	b=10;	
	}
	if(c>=10){
	c=10;
	}//����J,Q,KΪ10//
	if(a==1||b==1||c==1){
	if(a+b+c>=21){
		printf("The total value is 21");//��1������������Ӵ��ڵ���21ʱ//
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
	}	//��1����Ϊ11���//
	}
	else{
		n=a+b+c;
		printf("The total value is %d",n);
	}	//1����������������//
	return 0;
}
