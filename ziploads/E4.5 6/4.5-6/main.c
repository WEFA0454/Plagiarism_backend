#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[]) {
	
	int poke1,poke2,poke3,total;
	
	printf("�����������˿��ƣ�1����A��2����...)\n");
	scanf("%d %d %d",&poke1,&poke2,&poke3);
	
	total=poke1+poke2+poke3;
	
	if(poke1==1||poke2==1||poke3==1){
		if(total<11)
		total=total+10;
		
	}
	printf("�����˿��Ƶĵ�����Ϊ%d",total);
	
	
	return 0;
}
