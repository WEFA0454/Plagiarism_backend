#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	
	int poke1,poke2,poke3,total;
	
	printf("请输入三张扑克牌（1代表A，2代表...)\n");
	scanf("%d %d %d",&poke1,&poke2,&poke3);
	
	total=poke1+poke2+poke3;
	
	if(poke1==1||poke2==1||poke3==1){
		if(total<11)
		total=total+10;
		
	}
	printf("三张扑克牌的点数和为%d",total);
	
	
	return 0;
}
